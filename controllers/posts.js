const postsRouter = require('express').Router();
const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');
const middleware = require('../utils/middleware');

postsRouter.get('/', async (req, res) => {
  const posts = await Post.find({}).populate('comments', {
    content: 1,
    user: 1,
  });
  res.json(posts);
});

postsRouter.get('/:id', async (req, res) => {
  const foundPost = await Post.findById(req.params.id);
  res.json(foundPost);
});

postsRouter.post('/', middleware.userExtractor, async (req, res) => {
  if (req.body.title === undefined && req.body.content === 'undefined') {
    return res.status(404).end();
  }

  const user = req.user;
  if (!user) {
    res.status(401).json({ error: 'unauthorized, not logged in' });
  }

  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    tag: req.body.tag,
    user: user._id,
  });

  const savedPost = await post.save();
  const newPosts = user.posts.concat(savedPost._id);
  await User.findOneAndUpdate({ id: user._id }, { posts: newPosts });

  res.json(savedPost);
});

postsRouter.put('/:id', middleware.userExtractor, async (req, res) => {
  const user = req.user;
  const postToUpdate = await Post.findById(req.params.id);

  if (!user) {
    res.status(401).json({ error: 'unauthorized, not logged in' });
  }

  if (postToUpdate.user.toString() === user.id.toString()) {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedPost);
  } else {
    res.status(401).json({ error: 'unauthorized, not owner of post' });
  }
});

postsRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
  const user = req.user;
  const post = await Post.findById(req.params.id);

  if (!user) {
    res.status(401).json({ error: 'unauthorized, not logged in' });
  }

  if (post.user.toString() === user.id.toString()) {
    const removedPost = await Post.findByIdAndDelete(req.params.id);
    const newPosts = user.posts.filter(
      (post) => post.toString() !== removedPost._id.toString()
    );
    await User.findOneAndUpdate({ id: user.id }, { posts: newPosts });
    res.status(204).end();
  } else {
    res.status(401).json({ error: 'unauthorized, not owner of post' });
  }
});

postsRouter.get('/:id/comments', async (req, res) => {
  const post = await Post.findById(req.params.id).populate({
    path: 'comments',
    populate: {
      path: 'user',
    },
  });
  res.json(post.comments);
});

module.exports = postsRouter;

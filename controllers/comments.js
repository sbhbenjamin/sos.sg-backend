const commentsRouter = require('express').Router();
const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');
const middleware = require('../utils/middleware');

commentsRouter.get('/', async (req, res) => {
  const foundComments = await Comment.find({});
  res.json(foundComments);
});

commentsRouter.post('/', middleware.userExtractor, async (req, res) => {
  if (req.body.content === undefined && req.body.postid === undefined) {
    return res.status(404).end();
  }

  const user = req.user;
  const postid = req.body.postid;
  if (!user) {
    res.status(401).json({ error: 'unauthorized, not logged in' });
  }

  const newComment = new Comment({
    content: req.body.content,
    user: user._id,
    post: req.body.postid,
  });
  await newComment.save();
  newComment.populate('user', {
    username: 1,
  });

  // update post
  const post = await Post.findById(postid);
  console.log(post);

  post.comments = post.comments.concat(newComment);
  await post.save();

  // update user
  // const updatedUserComments = user.comments.concat(comment._id);
  // await User.findOneAndUpdate(
  //   { id: user._id },
  //   { comments: updatedUserComments }
  // );

  res.json(newComment);
});

commentsRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
  const user = req.user;
  const comment = await Comment.findById(req.params.id);

  if (!user) {
    res.status(401).json({ error: 'unauthorized, not logged in' });
  }

  if (user.id.toString() === comment.user.toString()) {
    const removedComment = await Comment.findByIdAndDelete(req.params.id);

    // update post
    const post = await Post.findById(comment.post);
    const newPostComments = post.comments.filter(
      (comment) => comment.toString() !== removedComment._id.toString()
    );
    await Post.findOneAndUpdate(
      { id: post._id },
      { comments: newPostComments }
    );

    // update user
    const user = req.user;
    const newUserComments = user.comments.filter(
      (comment) => comment.toString() !== removedComment._id.toString()
    );
    await User.findOneAndUpdate(
      { id: user._id },
      { comments: newUserComments }
    );

    res.status(204).end();
  } else {
    res.status(401).json({ error: 'unauthorized, not owner of comment' });
  }
});

module.exports = commentsRouter;

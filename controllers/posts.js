const postsRouter = require('express').Router();
const Post = require('../models/post');
const User = require('../models/user');
const middleware = require('../utils/middleware');

postsRouter.get('/', async (req, res) => {
  const posts = await Post.find({});
  res.json(posts);
});

postsRouter.get('/:id', async (req, res) => {
  const foundPost = await Post.findById(req.params.id);
  res.json(foundPost);
});

postsRouter.post('/', middleware.userExtractor, async (req, res) => {
  if (req.body.title === undefined && req.body.content) res.json(req.body);
});

module.exports = postsRouter;

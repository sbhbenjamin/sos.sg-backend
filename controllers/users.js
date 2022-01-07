const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

usersRouter.get('/:id', async (req, res) => {
  const foundUser = await User.findById(req.params.id);
  res.json(foundUser);
});

usersRouter.post('/', async (req, res) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(req.body.password, saltRounds);
  const user = new User({
    username: req.body.username,
    passwordHash,
  });

  const savedUser = await user.save();
  res.json(savedUser);
});

usersRouter.delete('/:id', async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  res.json(deletedUser);
});

module.exports = usersRouter;

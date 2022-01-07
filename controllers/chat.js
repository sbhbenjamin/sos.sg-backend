const chatsRouter = require('express').Router();
const Chat = require('../models/chat');
const middleware = require('../utils/middleware');

chatsRouter.get('/', async (req, res) => {
  const chats = await Chat.find({});
  res.json(chats);
});

chatsRouter.post('/', middleware.userExtractor, async (req, res) => {
  const chat = new Chat({
    user: req.user.id,
    messages: [],
  });
  await chat.save();
  res.json(chat);
});

chatsRouter.delete('/:id', async (req, res) => {
  await Chat.findOneAndDelete({ id: req.params.id });
  res.status(204).end();
});

module.exports = chatsRouter;

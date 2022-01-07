const messagesRouter = require('express').Router();
const Message = require('../models/message');
const Chat = require('../models/chat');
const middleware = require('../utils/middleware');

messagesRouter.get('/', async (req, res) => {
  const messages = await Message.find({});
  res.json(messages);
});

messagesRouter.post('/', middleware.userExtractor, async (req, res) => {
  const message = new Message({
    user: req.user.id,
    messages: [],
  });

  await message.save();
  const chat = await Chat.findById(req.body.chatid);
  const newMessages = chat.messages.concat(message);
  await Chat.findOneAndUpdate({ id: chat.id }, { messages: newMessages });
  res.json(message);
});

module.exports = messagesRouter;

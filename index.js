require('dotenv').config();
const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const middleware = require('./utils/middleware');
const config = require('./utils/config');
const socketUtils = require('./utils/socket');
const usersRouter = require('./controllers/users');
const postsRouter = require('./controllers/posts');
const loginRouter = require('./controllers/login');
const commentsRouter = require('./controllers/comments');
const messagesRouter = require('./controllers/messages');

const Message = require('./models/message');
const chatsRouter = require('./controllers/chat');

const server = http.createServer(app);
const io = socketUtils.sio(server);
socketUtils.connection(io);

// const socketIOMiddleware = (req, res, next) => {
//   req.io = io;

//   next();
// };

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB', error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

io.on('connection', (socket) => {
  console.log(`[${socket.id}] socket connected`);

  socket.on('disconnect', (reason) => {
    console.log(`[${socket.id}] socket disconnected - ${reason}`);
  });

  socket.on('join', (room) => {
    console.log(`Socket ${socket.id} joining ${room}`);
    socket.join(room);
  });

  socket.on('chat', (data) => {
    const { message, room } = data;
    console.log(`msg: ${message}, room: ${room}`);
    io.to(room).emit('chat', message);
    // const savedMessage = new Message({
    //   message,
    //   chatid: room,
    // });

    // savedMessage.save();
  });
});

app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/chats', chatsRouter);

app.use(middleware.unknownEndpoint);

// app.listen(config.PORT, () => {
//   console.log(`Server running on port ${config.PORT}`);
// });

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

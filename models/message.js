const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    content: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    chatid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
    },
  },
  { timestamps: true }
);

messageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Message', messageSchema);

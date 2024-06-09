import mongoose from "mongoose"
const Schema = mongoose.Schema

const MessageSchema = new Schema({
  Sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  Receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  Content: {
    type: String,
    required: true
  },
  IsDeleted: {
    type: Boolean,
    default: false
  },
  IsSeen: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

const Message = mongoose.model("Messages", MessageSchema)

export default Message

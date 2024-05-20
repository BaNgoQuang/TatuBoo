import mongoose from "mongoose"
const Schema = mongoose.Schema

const MessageSchema = new Schema({
  SenderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  ReceiverID: {
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
}, {
  timestamps: true
})

const Message = mongoose.model("Messages", MessageSchema)

export default Message

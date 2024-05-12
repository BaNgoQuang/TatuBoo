import mongoose from "mongoose"
const Schema = mongoose.Schema

const MessageSchema = new Schema({
  SenderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    require: true
  },
  ReceiverID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    require: true
  },
  Content: {
    type: String,
    require: true
  }
}, {
  timestamps: true
})

const Message = mongoose.model("Messages", MessageSchema)

export default Message

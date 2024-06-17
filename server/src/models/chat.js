import mongoose from "mongoose"
const Schema = mongoose.Schema

const ChatSchema = new Schema({
  Members: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
      }
    ],
    required: true
  },
  LastMessage: {
    type: String,
    default: ""
  },
  IsDeleted: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
})

const Chat = mongoose.model("Chats", ChatSchema)

export default Chat

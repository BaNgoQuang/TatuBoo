import Message from "../models/message.js"
import { response } from "../utils/lib.js"

const fncCreateMessage = async (req) => {
  try {
    const UserID = req.user.UserID
    const newMessage = await Message.create({ ...req.body, Sender: UserID })
    return response(newMessage, false, "Gửi tin nhắn thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

// const fncGet

const MessageService = {
  fncCreateMessage
}

export default MessageService

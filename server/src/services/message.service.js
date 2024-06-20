import Chat from "../models/chat.js"
import Message from "../models/message.js"
import { response } from "../utils/lib.js"
import sendEmail from "../utils/send-mail.js"

const ADMIN_ID = "664a5251b0563919ce2eba19"

const fncCreateMessage = async (req) => {
  try {
    let newChat
    const UserID = req.user.ID
    const { Content, ChatID, Receiver, Email } = req.body
    if (!ChatID) {
      newChat = await Chat.create({
        Members: !!Receiver ? [UserID, Receiver] : [UserID, ADMIN_ID],
        LastMessage: Content
      })
      // await sendEmail()
    } else {
      await Chat.findByIdAndUpdate(ChatID, { LastMessage: Content })
    }
    const newMessage = await Message.create({
      Chat: !!ChatID ? ChatID : newChat._id,
      Sender: UserID,
      Content: Content
    })
    return response(newMessage, false, "Gửi tin nhắn thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetMessageByChat = async (req) => {
  try {
    const { ChatID, PageSize, CurrentPage } = req.body
    const query = {
      Chat: ChatID,
    }
    const message = Message
      .find(query)
      .populate("Sender", ["_id", "FullName", "AvatarPath"])
      // .sort({ updatedAt: 1 })
      .skip((CurrentPage - 1) * PageSize)
      .limit(PageSize)
    const total = Message.countDocuments(query)
    const result = await Promise.all([message, total])
    return response({ List: result[0], Total: result[1] }, false, "Lấy data thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetChatWithUser = async (req) => {
  try {
    const UserID = req.user.ID
    const Receiver = req.body.Receiver
    const chat = await Chat.findOne({
      Members: [
        UserID,
        Receiver
      ]
    })
    // if (!chat) return response({}, true, "Chat không tồn tại", 200)
    return response(chat, false, "Lấy data thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetChatOfAdmin = async () => {
  try {
    const chats = await Chat
      .find({
        Members: {
          $elemMatch: { $eq: ADMIN_ID }
        }
      })
      .sort({ createdAt: -1 })
      .populate("Members", ["_id", "FullName", "AvatarPath"])
    return response(chats, false, "Lấy data thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetChatOfUser = async (req) => {
  try {
    const UserID = req.user.ID
    const chats = await Chat
      .find({
        Members: {
          $elemMatch: { $eq: UserID }
        }
      })
      .sort({ updatedAt: -1 })
      .populate("Members", ["_id", "FullName", "AvatarPath"])
    return response(chats, false, "Lấy data thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncSeenMessage = async (req) => {
  try {
    const UserID = req.user.ID
    const ChatID = req.params.ChatID
    const message = await Message.updateMany(
      {
        IsSeen: false,
        Chat: ChatID,
        Sender: {
          $ne: UserID
        }
      },
      { IsSeen: true },
      { new: true })
    return response(message, false, "Seen", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const MessageService = {
  fncCreateMessage,
  fncGetMessageByChat,
  fncGetChatWithUser,
  fncGetChatOfAdmin,
  fncSeenMessage,
  fncGetChatOfUser
}

export default MessageService

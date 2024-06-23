import MessageService from "../services/message.service.js"

const createMessage = async (req, res) => {
  try {
    const response = await MessageService.fncCreateMessage(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getMessageByChat = async (req, res) => {
  try {
    const response = await MessageService.fncGetMessageByChat(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getChatWithUser = async (req, res) => {
  try {
    const response = await MessageService.fncGetChatWithUser(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getChatOfAdmin = async (req, res) => {
  try {
    const response = await MessageService.fncGetChatOfAdmin(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getChatOfUser = async (req, res) => {
  try {
    const response = await MessageService.fncGetChatOfUser(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const seenMessage = async (req, res) => {
  try {
    const response = await MessageService.fncSeenMessage(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const MessageController = {
  createMessage,
  getMessageByChat,
  getChatWithUser,
  getChatOfAdmin,
  seenMessage,
  getChatOfUser
}

export default MessageController

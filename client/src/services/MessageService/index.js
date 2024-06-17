import http from "../index"
import {
  apiCreateMessage,
  apiGetChatOfAdmin,
  apiGetChatWithUser,
  apiGetMessageByChat,
  apiSeenMessage
} from "./urls"

const createMessage = body => http.post(apiCreateMessage, body)
const getMessageByChat = body => http.post(apiGetMessageByChat, body)
const getChatWithUser = () => http.get(apiGetChatWithUser)
const getChatOfAdmin = () => http.get(apiGetChatOfAdmin)
const seenMessage = ChatID => http.get(`${apiSeenMessage}/${ChatID}`)

const MessageService = {
  createMessage,
  getMessageByChat,
  getChatWithUser,
  getChatOfAdmin,
  seenMessage
}

export default MessageService

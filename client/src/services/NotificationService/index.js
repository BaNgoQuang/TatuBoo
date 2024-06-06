import http from "../index"
import {
  apiCreateNotification,
  apiGetListNotification,
  apiSeenNotification
} from "./urls"

const createNotification = body => http.post(apiCreateNotification, body)
const seenNotification = () => http.get(apiSeenNotification)
const getListNotification = () => http.get(apiGetListNotification)

const NotificationService = {
  createNotification,
  seenNotification,
  getListNotification
}

export default NotificationService

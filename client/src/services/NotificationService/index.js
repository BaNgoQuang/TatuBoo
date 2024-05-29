import { getLocalStorage } from "src/lib/commonFunction"
import http from "../index"
import {
  apiCreateNotification,
  apiGetListNotification,
  apiSeenNotification
} from "./urls"

const createNotification = body => http.post(apiCreateNotification, body, {
  headers: {
    'token': `Bearer ${getLocalStorage("token")}`
  }
})

const seenNotification = () => http.get(apiSeenNotification, {
  headers: {
    'token': `Bearer ${getLocalStorage("token")}`
  }
})

const getListNotification = () => http.get(apiGetListNotification, {
  headers: {
    'token': `Bearer ${getLocalStorage("token")}`
  }
})

const NotificationService = {
  createNotification,
  seenNotification,
  getListNotification
}

export default NotificationService

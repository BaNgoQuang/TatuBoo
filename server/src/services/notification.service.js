import Notification from "../models/notification.js"
import { response } from "../utils/lib.js"

const fncCreateNotification = async (req) => {
  try {
    const Sender = req.user.ID
    const notification = await Notification.create({ ...req.body, Sender })
    return response(notification, false, "Thêm mới thành công", 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncSeenNotification = async (req) => {
  try {
    const notification = await Notification.updateMany({ IsSeen: false }, { IsSeen: true }, { new: true })
    return response(notification, false, "Seen", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetListNotification = async (req) => {
  try {
    const notifications = await Notification
      .find()
      .populate('Sender', ['_id', 'FullName', 'RoleID'])
      .sort({ createdAt: 1 })
    const notificationsNotSeen = notifications.filter(i => !i.IsSeen)
    return response(
      { List: notifications.reverse(), NotSeen: notificationsNotSeen.length },
      false,
      "Lấy data thành công",
      200
    )
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const NotificationService = {
  fncCreateNotification,
  fncSeenNotification,
  fncGetListNotification
}

export default NotificationService

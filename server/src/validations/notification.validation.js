import Joi from 'joi'
import { getRegexObjectID } from '../utils/commonFunction.js'

const createNotificaiton = async (req, res, next) => {
  const trueCondition = Joi.object({
    Content: Joi.string().min(3).max(256).required(),
    Receiver: Joi.string().regex(getRegexObjectID()).required(),
    Sender: Joi.string().regex(getRegexObjectID()).required(),
    Type: Joi.string().required()
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const seenNotification = async (req, res, next) => {
  const trueCondition = Joi.object({
    NotificationID: Joi.string().regex(getRegexObjectID()).required(),
    ReceiverID: Joi.string().regex(getRegexObjectID()).required(),
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const NotificaitonValidation = {
  createNotificaiton,
  seenNotification
}

export default NotificaitonValidation

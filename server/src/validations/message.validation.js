import Joi from "joi"
import { getRegexObjectID } from '../utils/commonFunction.js'
import { parameterValidation } from "./common.validation.js"

const createMessage = async (req, res, next) => {
  const { ChatID, Receiver } = req.body
  const trueCondition = Joi.object({
    ChatID: !!ChatID ? Joi.string().pattern(getRegexObjectID()) : Joi.string(),
    Receiver: !!Receiver ? Joi.string().pattern(getRegexObjectID()) : Joi.string(),
    Content: Joi.string().min(3).max(256).required()
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const getMessageByChat = async (req, res, next) => {
  const trueCondition = Joi.object({
    ChatID: !!ChatID ? Joi.string().pattern(getRegexObjectID()) : Joi.string(),
    PageSize: Joi.number().integer().min(1).required(),
    CurrentPage: Joi.number().integer().min(1).required(),
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const getChatWithUser = async (req, res, next) => {
  const trueCondition = Joi.object({
    Receiver: Joi.string().pattern(getRegexObjectID()).required(),
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const seenMessage = async (req, res, next) => {
  const trueCondition = parameterValidation("ChatID")
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const MessageValidation = {
  createMessage,
  getMessageByChat,
  getChatWithUser,
  seenMessage
}

export default MessageValidation

import Joi from "joi"
import { getRegexObjectID } from '../utils/commonFunction.js'

const createPayment = async (req, res, next) => {
  const trueCondition = Joi.object({
    Description: Joi.string().min(3).max(256).required(),
    PaymentType: Joi.number().min(1).max(3).required(),
    TotalFee: Joi.number().min(1).required(),
    TraddingCode: Joi.number().min(1).required(),
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const getListPaymentHistoryByUser = async (req, res, next) => {
  const { PaymentType, PaymentStatus } = req.body
  const trueCondition = Joi.object({
    PageSize: Joi.number().integer().min(1).required(),
    CurrentPage: Joi.number().integer().min(1).required(),
    TraddingCode: Joi.string().empty("").required(),
    PaymentType: !!PaymentType ? Joi.number().min(1).max(3) : Joi.number(),
    PaymentStatus: !!PaymentStatus ? Joi.number().min(1).max(3) : Joi.number(),
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const changePaymentStatus = async (req, res, next) => {
  const trueCondition = Joi.object({
    PaymentID: Joi.string().pattern(getRegexObjectID()).required(),
    PaymentStatus: Joi.number().min(1).max(3).required(),
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const getListPayment = async (req, res, next) => {
  const { PaymentType, PaymentStatus } = req.body
  const trueCondition = Joi.object({
    PageSize: Joi.number().integer().min(1).required(),
    CurrentPage: Joi.number().integer().min(1).required(),
    TextSearch: Joi.string().empty(""),
    PaymentType: !!PaymentType ? Joi.number().min(1).max(3) : Joi.number(),
    PaymentStatus: !!PaymentStatus ? Joi.number().min(1).max(3) : Joi.number()
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const PaymentValidation = {
  createPayment,
  getListPaymentHistoryByUser,
  changePaymentStatus,
  getListPayment
}

export default PaymentValidation

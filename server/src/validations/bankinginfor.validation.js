import Joi from 'joi'
import { getRegexObjectID } from '../utils/commonFunction.js'

const createBankingInfor = async (req, res, next) => {
  const { BankingInforID } = req.body
  const trueCondition = Joi.object({
    User: Joi.string().pattern(getRegexObjectID()).required(),
    BankID: Joi.number().min(1).required(),
    UserBankName: Joi.string().required(),
    UserBankAccount: Joi.number().min(1).required(),
    BankingInforID: !!BankingInforID ? Joi.string().pattern(getRegexObjectID()) : Joi.string()
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const updateBankingInfor = async (req, res, next) => {
  const trueCondition = Joi.object({
    User: Joi.string().pattern(getRegexObjectID()).required(),
    BankID: Joi.number().min(1).required(),
    UserBankName: Joi.string().required(),
    UserBankAccount: Joi.number().min(1).required(),
    BankingInforID: Joi.string.pattern(getRegexObjectID()).required()
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const getListPaymentInCurrentWeek = async (req, res, next) => {
  const trueCondition = Joi.object({
    PageSize: Joi.number().integer().min(1).required(),
    CurrentPage: Joi.number().integer().min(1).required(),
    StartDate: Joi.date(),
    EndDate: Joi.date()
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const BankInforValidation = {
  createBankingInfor,
  updateBankingInfor,
  getListPaymentInCurrentWeek
}

export default BankInforValidation

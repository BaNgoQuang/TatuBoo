import Joi from 'joi'
import { getRegexObjectID } from '../utils/commonFunction.js'

const createReport = async (req, res, next) => {
  const trueCondition = Joi.object({
    Timetable: Joi.string().pattern(getRegexObjectID()).required(),
    Teacher: Joi.string().pattern(getRegexObjectID()).required(),
    Title: Joi.string().min(1).required(),
    Content: Joi.string().min(1).required(),
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const getListReport = async (req, res, next) => {
  const trueCondition = Joi.object({
    PageSize: Joi.number().integer().min(0).required(),
    CurrentPage: Joi.number().integer().min(0).required(),
    TextSearch: Joi.string().empty(""),
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const ReportValidation = {
  createReport,
  getListReport
}

export default ReportValidation

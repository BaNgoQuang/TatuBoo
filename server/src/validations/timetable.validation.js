import Joi from "joi"
import { getRegexObjectID } from "../utils/commonFunction.js"
import { fileValidation } from "./common.validation.js"

const createTimeTable = async (req, res, next) => {
  const isHasAddress = req.body.every(i => !!i.Address)
  const trueCondition = Joi.array().items(
    Joi.object({
      LearnHistory: Joi.string().pattern(getRegexObjectID()).required(),
      Teacher: Joi.string().pattern(getRegexObjectID()).required(),
      Subject: Joi.string().pattern(getRegexObjectID()).required(),
      DateAt: Joi.date().required(),
      StartTime: Joi.date().required(),
      EndTime: Joi.date().required(),
      LearnType: Joi.number().integer().valid(1, 2).required(),
      Address: !!isHasAddress ? Joi.string().min(1) : Joi.string().empty("")
    })
  )
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const updateTimeTable = async (req, res, next) => {
  const trueCondition = Joi.object({
    TimeTablID: Joi.string().pattern(getRegexObjectID()).required(),
    DateAt: Joi.date().required(),
    StartTime: Joi.date().required(),
    EndTime: Joi.date().required(),
  })
  const trueConditionWithFile = fileValidation("Document", "application")
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    await trueConditionWithFile.validateAsync(req.file, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const TimeTableValidation = {
  createTimeTable,
  updateTimeTable
}

export default TimeTableValidation

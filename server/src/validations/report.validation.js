import Joi from 'joi'
import { getRegexObjectID } from '../utils/commonFunction.js'

const createReport = async (req, res, next) => {
  const trueCondition = Joi.object({
    Sender: Joi.string().pattern(getRegexObjectID()).required(),
    SubjectName: Joi.string().min(1).required()
  })
  const trueConditionWithFile = fileValidation("Avatar", "image")
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    await trueConditionWithFile.validateAsync(req.file, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const ReportValidation = {

}

export default ReportValidation

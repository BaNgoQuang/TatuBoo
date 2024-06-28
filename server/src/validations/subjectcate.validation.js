import Joi from 'joi'
import fileImageValidation from './file.validation.js'

const createSubjectCate = async (req, res, next) => {
  const trueCondition = Joi.object({
   
  })
  const trueConditionWithFile = fileImageValidation("Avatar")
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    await trueConditionWithFile.validateAsync(req.file, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const getListSubjectCate = async (req, res, next) => {
  const trueCondition = Joi.object({
   
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const updateSubjectCate = async (req, res, next) => {
  const trueCondition = Joi.object({
   
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const getDetailSubjectCate = async (req, res, next) => {
  const trueCondition = Joi.object({
   
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const getListSubjectCateAndSubject = async (req, res, next) => {
  const trueCondition = Joi.object({
   
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const SubjectCateValidation = {
  createSubjectCate,
  getListSubjectCate,
  updateSubjectCate,
  getDetailSubjectCate,
  getListSubjectCateAndSubject
}

export default SubjectCateValidation
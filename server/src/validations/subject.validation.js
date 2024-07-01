import Joi from 'joi'

const createSubject = async (req, res, next) => {
  const trueCondition = Joi.object({
   
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const getListSubject = async (req, res, next) => {
  const trueCondition = Joi.object({
   
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const updateSubject = async (req, res, next) => {
  const trueCondition = Joi.object({
   
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const getDetailSubject = async (req, res, next) => {
  const trueCondition = Joi.object({
   
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const SubjectValidation = {
  createSubject,
  getListSubject,
  updateSubject,
  getDetailSubject
}

export default SubjectValidation

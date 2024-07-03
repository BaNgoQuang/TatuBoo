import Joi from 'joi'

const createComment = async (req, res, next) => {
  const trueCondition = Joi.object({
    Teacher: Joi.string().pattern(getRegexObjectID()).required(),
    Rate: Joi.number().integer().min(1).max(5).required(),
    Content: Joi.string().min(3).max(256).required()
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const getListCommentOfTeacher = async (req, res, next) => {
  const trueCondition = Joi.object({
    TeacherID: Joi.string().pattern(getRegexObjectID()).required(),
    PageSize: Joi.number().integer().min(1).required(),
    CurrentPage: Joi.number().integer().min(1).required(),
  })
  try {
    await trueCondition.validateAsync(req.params, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const CommentValidation = {
  createComment,
  getListCommentOfTeacher
}

export default CommentValidation

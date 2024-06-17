import Joi from 'joi'

const insertComment = async (req, res, next) => {
  const trueCondition = Joi.object({
    Comic: Joi.any().required(),
    Content: Joi.string().min(3).max(256)
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const getAllCommentByComic = async (req, res, next) => {
  const trueCondition = Joi.object({
    ComicID: Joi.any().required()
  })
  try {
    await trueCondition.validateAsync(req.params, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}


const CommentValidation = {
  insertComment,
  getAllCommentByComic
}

export default CommentValidation

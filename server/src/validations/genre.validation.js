import Joi from 'joi'

const insertGenre = async (req, res, next) => {
  const trueCondition = Joi.object({
    Title: Joi.string().min(3).max(30).required(),
    ShortDescription: Joi.string().min(3).max(256).required(),
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const updateGenre = async (req, res, next) => {
  const trueCondition = Joi.object({
    id: Joi.any().required(),
    Title: Joi.string().min(3).max(30).required(),
    ShortDescription: Joi.string().min(3).max(256).required(),
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const getDetailGenre = async (req, res, next) => {
  const trueCondition = Joi.object({
    id: Joi.any().required(),
  })
  try {
    await trueCondition.validateAsync(req.params, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}


const GenreValidation = {
  insertGenre,
  updateGenre,
  getDetailGenre
}

export default GenreValidation

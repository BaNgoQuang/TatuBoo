import Joi from 'joi'
import fileImageValidation from './file.validation.js'

const insertImage = async (req, res, next) => {
  const trueCondition = Joi.object({
    Comic: Joi.any().required(),
    Chapter: Joi.number().integer().required(),
    SortOrder: Joi.number().integer().required()
  })
  const trueConditionWithFile = fileImageValidation("Image")
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    await trueConditionWithFile.validateAsync(req.file, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const getAllImagesByChapter = async (req, res, next) => {
  const trueCondition = Joi.object({
    ComicID: Joi.any().required(),
    Chapter: Joi.number().integer().required(),
    Date: Joi.date().required()
  })
  const trueConditionWithFile = fileImageValidation("Image")
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    await trueConditionWithFile.validateAsync(req.file, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}


const ImageValidation = {
  insertImage,
  getAllImagesByChapter
}

export default ImageValidation

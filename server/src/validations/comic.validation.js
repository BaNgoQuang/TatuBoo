import Joi from 'joi'
import fileImageValidation from './file.validation.js'

const getAllComics = async (req, res, next) => {
  const trueCondition = Joi.object({
    CurrentPage: Joi.number().integer().min(1).required(),
    PageSize: Joi.number().integer().required(),
    isAdmin: Joi.boolean().required(),
    TextSearch: Joi.string().empty("")
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const getAllComicsByGenre = async (req, res, next) => {
  const trueCondition = Joi.object({
    CurrentPage: Joi.number().integer().min(1).required(),
    PageSize: Joi.number().integer().required(),
    GenreID: Joi.any(),
    TextSearch: Joi.string().empty("")
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const getAllComicsByAuthor = async (req, res, next) => {
  const trueCondition = Joi.object({
    CurrentPage: Joi.number().integer().min(1).required(),
    PageSize: Joi.number().integer().required(),
    UserID: Joi.any().required(),
    IsPrivated: Joi.boolean().required()
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const insertComic = async (req, res, next) => {
  const trueCondition = Joi.object({
    Genres: Joi.array().items(Joi.any().required()).required(),
    Title: Joi.string().min(3).required(),
    ShortDescription: Joi.string().min(3).required(),
    Chapters: Joi.array().items({
      ChapterID: Joi.number().integer().required(),
      Name: Joi.string().min(3).max(30),
    })
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

const updateComic = async (req, res, next) => {
  const trueCondition = Joi.object({
    ComicID: Joi.any().required(),
    Genres: Joi.array().items(Joi.any().required()).required(),
    Title: Joi.string().min(3).max(30),
    ShortDescription: Joi.string().min(3).max(100),
    Chapters: Joi.array().items({
      ChapterID: Joi.number().integer().required(),
      Name: Joi.string().min(3).max(30),
    })
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

const getParamsComicID = async (req, res, next) => {
  const trueCondition = Joi.object({
    ComicID: Joi.any().required(),
  })
  try {
    await trueCondition.validateAsync(req.params, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const changeStatusComic = async (req, res, next) => {
  const trueCondition = Joi.object({
    ComicID: Joi.any().required(),
    Status: Joi.number().integer().required()
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const getAllHotComics = async (req, res, next) => {
  const trueCondition = Joi.object({
    FillNumber: Joi.number().integer().required(),
  })
  try {
    await trueCondition.validateAsync(req.params, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}


const ComicValidation = {
  getAllComics,
  getAllComicsByGenre,
  getAllComicsByAuthor,
  insertComic,
  updateComic,
  getParamsComicID,
  changeStatusComic,
  getAllHotComics
}

export default ComicValidation

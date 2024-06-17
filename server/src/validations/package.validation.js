import Joi from 'joi'

const insertPackage = async (req, res, next) => {
  const trueCondition = Joi.object({
    Title: Joi.string().min(3).max(30).required(),
    Description: Joi.string().min(3).max(256).required(),
    Price: Joi.string().min(3).max(30).required(),
    Duration: Joi.number().integer().required()
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const updatePackage = async (req, res, next) => {
  const trueCondition = Joi.object({
    id: Joi.any().required(),
    Title: Joi.string().min(3).max(30).required(),
    Description: Joi.string().min(3).max(256).required(),
    Price: Joi.string().min(3).max(30).required(),
    Duration: Joi.number().integer().required()
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const getAllPackages = async (req, res, next) => {
  const trueCondition = Joi.object({
    CurrentPage: Joi.number().integer().min(1).required(),
    PageSize: Joi.number().integer().required(),
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const getDetailPackage = async (req, res, next) => {
  const trueCondition = Joi.object({
    PackageID: Joi.any().required(),
  })
  try {
    await trueCondition.validateAsync(req.params, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}


const PackageValidation = {
  insertPackage,
  updatePackage,
  getAllPackages,
  getDetailPackage
}

export default PackageValidation

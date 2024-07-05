import Joi from "joi"

const statisticTotalUser = async (req, res, next) => {
  const trueCondition = Joi.object({
    FromDate: Joi.date().required(),
    ToDate: Joi.date().required()
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const statisticNewRegisteredUser = async (req, res, next) => {
  const trueCondition = Joi.object({
    Key: Joi.string().valid("Day", "Week", "Month").required()
  })
  try {
    await trueCondition.validateAsync(req.query, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

const StatisticValidation = {
  statisticTotalUser,
  statisticNewRegisteredUser
}

export default StatisticValidation

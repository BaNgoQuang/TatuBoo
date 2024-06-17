import Joi from 'joi'

const insertNotificaiton = async (req, res, next) => {
  const trueCondition = Joi.object({
    Content: Joi.string().min(3).max(256).required(),
    Receiver: Joi.any(),
    Sender: Joi.any()
  })
  try {
    await trueCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}


const NotificaitonValidation = {
  insertNotificaiton,
}

export default NotificaitonValidation

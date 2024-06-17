import Joi from 'joi'

const fileImageValidation = (name) => {
  return Joi.object({
    fieldname: Joi.string().valid(name).required(),
    originalname: Joi.string().required(),
    encoding: Joi.string(),
    mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif').required(),
    path: Joi.string().required(),
    size: Joi.number().max(10 * 1024 * 1024).required(),
    filename: Joi.string().required()
  })
}

export default fileImageValidation
import UserSerivce from "../services/user.service.js"

const getDetailProfile = async (req, res) => {
  try {
    const response = await UserSerivce.fncGetDetailProfile(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const changeProfile = async (req, res) => {
  try {
    const response = await UserSerivce.fncChangeProfile(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const requestConfirmRegister = async (req, res) => {
  try {
    const response = await UserSerivce.fncRequestConfirmRegister(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const responseConfirmRegister = async (req, res) => {
  try {
    const response = await UserSerivce.fncResponseConfirmRegister(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const pushSubjectForTeacher = async (req, res) => {
  try {
    const response = await UserSerivce.fncPushSubjectForTeacher(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getListTeacher = async (req, res) => {
  try {
    const response = await UserSerivce.fncGetListTeacher(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const UserController = {
  getDetailProfile,
  changeProfile,
  requestConfirmRegister,
  responseConfirmRegister,
  pushSubjectForTeacher,
  getListTeacher
}

export default UserController

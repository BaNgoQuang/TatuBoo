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

const sendRequestConfirmRegister = async (req, res) => {
  try {
    const response = await UserSerivce.fncSendRequestConfirmRegister(req)
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

const UserController = {
  getDetailProfile,
  changeProfile,
  sendRequestConfirmRegister,
  responseConfirmRegister,
  pushSubjectForTeacher
}

export default UserController

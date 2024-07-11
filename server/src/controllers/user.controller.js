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

const pushOrPullSubjectForTeacher = async (req, res) => {
  try {
    const response = await UserSerivce.fncPushOrPullSubjectForTeacher(req)
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

const getListTeacherByUser = async (req, res) => {
  try {
    const response = await UserSerivce.fncGetListTeacherByUser(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getDetailTeacher = async (req, res) => {
  try {
    const response = await UserSerivce.fncGetDetailTeacher(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getListStudent = async (req, res) => {
  try {
    const response = await UserSerivce.fncGetListStudent(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const inactiveOrActiveAccount = async (req, res) => {
  try {
    const response = await UserSerivce.fncInactiveOrActiveAccount(req)
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
  pushOrPullSubjectForTeacher,
  getListTeacher,
  getListTeacherByUser,
  getDetailTeacher,
  getListStudent,
  inactiveOrActiveAccount
}

export default UserController

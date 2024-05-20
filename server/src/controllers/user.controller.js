import UserSerivce from "../services/user.service.js"

const getDetailProfile = async (req, res) => {
  try {
    const response = await UserSerivce.fncGetDetailProfile(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const UserController = {
  getDetailProfile
}

export default UserController

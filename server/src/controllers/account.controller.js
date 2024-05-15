import AccountService from "../services/account.service.js"

const register = async (req, res) => {
  try {
    const response = await AccountService.fncRegister(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const registerByGoogle = async (req, res) => {
  try {
    const response = await AccountService.fncRegisterByGoogle(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const login = async (req, res) => {
  try {
    const response = await AccountService.fncLogin(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const loginByGoogle = async (req, res) => {
  try {
    const response = await AccountService.fncLoginByGoogle(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const AccountController = {
  register,
  registerByGoogle,
  login,
  loginByGoogle
}

export default AccountController

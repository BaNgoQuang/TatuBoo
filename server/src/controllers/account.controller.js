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
    const response = await AccountService.fncLogin(req, res)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const loginByGoogle = async (req, res) => {
  try {
    const response = await AccountService.fncLoginByGoogle(req, res)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const logout = async (req, res) => {
  res.clearCookie("token")
  return res.status(200).json({ data: {}, isError: false, msg: "Đăng xuất thành công" })
}

const changePassword = async (req, res) => {
  try {
    const response = await AccountService.fncChangePassword(req, res)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const AccountController = {
  register,
  registerByGoogle,
  login,
  loginByGoogle,
  logout,
  changePassword
}

export default AccountController

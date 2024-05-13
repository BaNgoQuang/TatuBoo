import AccountService from "../services/account.service.js"

const register = async (req, res) => {
  try {
    const response = await AccountService.fncRegister(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}


const AccountController = {
  register
}

export default AccountController

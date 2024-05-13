import Account from "../models/account.js"
import User from "../models/user.js"
import bcrypt from "bcrypt"
import { response } from "../utils/lib.js"
import { getOneDocument } from "../utils/commonFunction.js"
const saltRounds = 10

const fncRegister = async (req) => {
  try {
    let dataBody
    const IsByGoogle = req.body.IsByGoogle
    const RoleID = req.body.RoleID
    if (!!IsByGoogle) {
      const { email, given_name, picture } = req.body
      dataBody = { email, given_name, picture }
    } else {
      const { Email, Password } = req.body
      dataBody = { Email, Password }
    }
    const checkExist = await getOneDocument(Account, "Email", !!IsByGoogle ? dataBody.email : dataBody.Email)
    if (!!checkExist) return response({}, true, "Email đã tồn tại", 200)
    const hashPassword = !!IsByGoogle && bcrypt.hashSync(dataBody.Password, saltRounds)
    const hashUser = {
      ...req.body,
      Password: !!IsByGoogle && hashPassword,
      RoleID: RoleID
    }
    const newUser = await User.create({
      FullName: hashUser.FullName,
      RoleID: RoleID,
      IsByGoogle: IsByGoogle
    })
    if (RoleID === 2) {
      await Account.create({
        OrganizationID: newUser._id,
        Email: !!IsByGoogle ? dataBody.email : dataBody.Email,
        Password: !IsByGoogle && hashPassword
      })
    } else if (RoleID === 3 || RoleID === 4) {
      await Account.create({
        UserID: newUser._id,
        Email: !!IsByGoogle ? dataBody.email : dataBody.Email,
        Password: !IsByGoogle && hashPassword
      })
    }
    return response({}, false, "Đăng ký tài khoản thành công", 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}


const AccountService = {
  fncRegister
}

export default AccountService

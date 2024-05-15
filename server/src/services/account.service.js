import Account from "../models/account.js"
import User from "../models/user.js"
import Organization from "../models/organization.js"
import bcrypt from "bcrypt"
import { response } from "../utils/lib.js"
import { encodeData, getOneDocument } from "../utils/commonFunction.js"
const saltRounds = 10

const fncRegister = async (req) => {
  try {
    const { Password, Email, RoleID, FullName } = req.body
    const checkExist = await getOneDocument(Account, "Email", Email)
    if (!!checkExist) return response({}, true, "Email đã tồn tại", 200)
    const hashPassword = bcrypt.hashSync(Password, saltRounds)
    const user = await User.create({
      FullName,
      RoleID,
      IsByGoogle: false
    })
    await Account.create({
      UserID: user._id,
      Email,
      Password: hashPassword
    })
    return response({}, false, "Đăng ký tài khoản thành công", 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncRegisterByGoogle = async (req) => {
  try {
    const { email, given_name, picture, RoleID } = req.body
    const checkExist = await getOneDocument(Account, "Email", email)
    if (!!checkExist) return response({}, true, "Email đã tồn tại", 200)
    const user = await User.create({
      FullName: given_name,
      AvatarPath: picture,
      RoleID,
      IsByGoogle: true
    })
    await Account.create({
      UserID: user._id,
      Email: email
    })
    return response({}, false, "Đăng ký tài khoản thành công", 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncLogin = async (req) => {
  try {
    const { Password, Email } = req.body
    const getAccount = await getOneDocument(Account, "Email", Email)
    if (!getAccount) return response({}, true, "Email không tồn tại", 200)
    const check = bcrypt.compareSync(Password, getAccount.Password)
    if (!check) return response({}, true, "Mật khẩu không chính xác", 200)
    let user
    if (!!getAccount.OrganizationID) {
      user = await getOneDocument(Organization, "_id", getAccount.OrganizationID)
    } else if (!!getAccount.UserID) {
      user = await getOneDocument(User, "_id", getAccount.UserID)
    }
    if (!user.IsActive) return response({}, true, "Tài khoản đã bị khóa", 200)
    const token = encodeData({
      ID: user._id,
      RoleID: user.RoleID,
    })
    return response(token, false, "Login thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncLoginByGoogle = async (req, res) => {
  try {
    const email = req.body.email
    const getAccount = await getOneDocument(Account, "Email", email)
    if (!getAccount) return response({}, true, "Email không tồn tại", 200)
    let user
    if (!!getAccount.OrganizationID) {
      user = await getOneDocument(Organization, "_id", getAccount.OrganizationID)
    } else if (!!getAccount.UserID) {
      user = await getOneDocument(User, "_id", getAccount.UserID)
    }
    if (!user.IsActive) return response({}, true, "Tài khoản đã bị khóa", 200)
    const token = encodeData({
      ID: user._id,
      RoleID: user.RoleID,
    })
    return response(token, false, "Login thành công", 200)
  } catch (error) {
    return response({}, true, "Login thành công", 200)
  }
}


const AccountService = {
  fncRegister,
  fncRegisterByGoogle,
  fncLogin,
  fncLoginByGoogle,
}

export default AccountService

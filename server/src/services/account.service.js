import Account from "../models/account.js"
import User from "../models/user.js"
import Admin from "../models/admin.js"
import bcrypt from "bcrypt"
import { Roles, response } from "../utils/lib.js"
import { encodeData, getOneDocument, randomPassword } from "../utils/commonFunction.js"
import sendEmail from "../utils/send-mail.js"
const saltRounds = 10

const fncRegister = async (req) => {
  try {
    const { Email, RoleID, FullName } = req.body
    const password = randomPassword()
    const checkExist = await getOneDocument(Account, "Email", Email)
    if (!!checkExist) return response({}, true, "Email đã tồn tại", 200)
    const hashPassword = bcrypt.hashSync(password, saltRounds)
    const user = await User.create({
      ...req.body,
      Subjects: RoleID !== Roles.ROLE_STUDENT ? [req.body.Subject] : [],
      IsByGoogle: false,
      RegisterStatus: RoleID === Roles.ROLE_STUDENT ? 3 : 1
    })
    await Account.create({
      UserID: user._id,
      Email,
      Password: hashPassword
    })
    const subject = "THÔNG BÁO DUYỆT TÀI KHOẢN ĐĂNG KÝ"
    const content = `
                <html>
                <head>
                <style>
                    p {
                        color: #333;
                    }
                </style>
                </head>
                <body>
                  <p style="margin-top: 30px; margin-bottom:10px">Xin chào ${FullName},</p>
                  <p style="margin-bottom:10px">TaTuBoo thông báo tài khoản của quý khách đã được duyệt.</p>
                  <p>Thông tin tài khoản được cấp:</p>
                  <p>Email: ${Email}</p>
                  <p>Mật khẩu: ${password}</p>
                  <p>Quý khách truy cập vào trang web <a href='http://localhost:5173/dang-nhap'>tại đây</a> của Tatuboo để đăng nhập và sử dụng những dịch vụ của chúng tôi.</p>
                </body>
                </html>
                `
    await sendEmail(Email, subject, content)
    return response(
      {},
      false,
      "Tài khoản đăng ký thành công.Hãy kiểm tra email bạn dùng để đăng ký để lấy thông tin tài khoản.",
      201
    )
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
      Email: email,
      FullName: given_name,
      AvatarPath: picture,
      RoleID,
      IsByGoogle: true,
      Subjects: RoleID !== Roles.ROLE_STUDENT ? [req.body.Subject] : [],
      RegisterStatus: RoleID === Roles.ROLE_STUDENT ? 3 : 1
    })
    await Account.create({
      UserID: user._id,
      Email: email,
    })
    return response(
      {},
      false,
      RoleID === Roles.ROLE_STUDENT
        ? "Đăng ký tài khoản thành công."
        : "Đăng ký tài khoản thành công. Hãy đăng nhập và chỉnh sửa profile để trở thành giáo viên chính thức.",
      201
    )
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncLogin = async (req, res) => {
  try {
    const { Password, Email } = req.body
    const getAccount = await getOneDocument(Account, "Email", Email)
    if (!getAccount) return response({}, true, "Email không tồn tại", 200)
    const check = bcrypt.compareSync(Password, getAccount.Password)
    if (!check) return response({}, true, "Mật khẩu không chính xác", 200)
    if (!getAccount.IsActive) return response({}, true, "Tài khoản đã bị khóa", 200)
    let user
    if (!!getAccount.AdminID) {
      user = await getOneDocument(Admin, "_id", getAccount.AdminID)
    } else if (!!getAccount.UserID) {
      user = await getOneDocument(User, "_id", getAccount.UserID)
    }
    const token = encodeData({
      ID: user._id,
      RoleID: user.RoleID,
    })
    res.cookie("token", token)
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
    if (!!getAccount.AdminID) {
      user = await getOneDocument(Admin, "_id", getAccount.AdminID)
    } else if (!!getAccount.UserID) {
      user = await getOneDocument(User, "_id", getAccount.UserID)
    }
    if (!getAccount.IsActive) return response({}, true, "Tài khoản đã bị khóa", 200)
    const token = encodeData({
      ID: user._id,
      RoleID: user.RoleID,
    })
    res.cookie("token", token, {
      httpOnly: false,
      secure: false,
      path: "/",
      sameSite: "strict",
    })
    return response(token, false, "Login thành công", 200)
  } catch (error) {
    return response({}, true, "Login thành công", 200)
  }
}

const fncChangePassword = async (req) => {
  
}

const AccountService = {
  fncRegister,
  fncRegisterByGoogle,
  fncLogin,
  fncLoginByGoogle,
}

export default AccountService

import Admin from "../models/admin.js"
import User from "../models/user.js"
import { Roles, response } from "../utils/lib.js"

const fncGetDetailProfile = async (req) => {
  try {
    const UserID = req.user.ID
    const RoleID = req.user.RoleID
    let user
    if (RoleID === Roles.ROLE_ADMIN || RoleID === Roles.ROLE_STAFF) {
      user = await Admin.findOne({ _id: UserID })
    } else {
      user = await User.findOne({ _id: UserID })
    }
    if (!user) return response({}, true, "Người dùng không tồn tại", 200)
    return response(user, false, "Lấy ra thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const UserSerivce = {
  fncGetDetailProfile
}

export default UserSerivce

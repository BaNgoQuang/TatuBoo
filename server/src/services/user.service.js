import Admin from "../models/admin.js"
import User from "../models/user.js"
import { getOneDocument } from "../utils/commonFunction.js"
import { Roles, response } from "../utils/lib.js"

const fncGetDetailProfile = async (req) => {
  try {
    const UserID = req.user.ID
    const RoleID = req.user.RoleID
    let user
    if (RoleID === Roles.ROLE_ADMIN || RoleID === Roles.ROLE_STAFF) {
      user = await Admin.findOne({ _id: UserID })
    } else {
      user = await User
        .findOne({ _id: UserID })
        .populate("Subjects", ["_id", "SubjectName"])
    }
    if (!user) return response({}, true, "Người dùng không tồn tại", 200)
    return response(user, false, "Lấy ra thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncChangeProfile = async (req) => {
  try {
    const UserID = req.user.ID
    const user = await getOneDocument(User, "_id", UserID)
    if (!user) return response({}, true, "Người dùng không tồn tại", 200)
    const updateProfile = await User
      .findOneAndUpdate(
        { _id: UserID },
        {
          ...req.body,
          AvatarPath: !!req.file ? req.file.path : user.AvatarPath
        },
        { new: true }
      )
      .populate("Subjects", ["_id", "SubjectName"])
    return response(updateProfile, false, "Update thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncSendRequestConfirmRegister = async (req) => {
  try {
    const UserID = req.user.ID
    const user = await User.findOneAndUpdate({ _id: UserID }, { RegisterStatus: 2 }, { new: true })
    if (!user) return response({}, true, "Người dùng không tồn tại", 200)
    return response(user, false, "Yêu cầu của bạn đã được gửi. Hệ thống sẽ phản hồi yêu cầu của bạn trong 48h.", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncResponseConfirmRegister = async (req) => {
  try {
    const { TeacherID, RegisterStatus, FullName } = req.body
    const user = await User.findOneAndUpdate({ _id: TeacherID }, { RegisterStatus }, { new: true })
    if (!user) return response({}, true, "Người dùng không tồn tại", 200)
    const confirmContent = "Thông tin tài khoản của bạn đã được duyệt. Từ giờ bạn đã trở thành giáo viên của TaTuBoo và bạn đã có thể nhận học viên."
    const noteContent = "LƯU Ý: Hãy tuân thủ tất cả điều khoản của TaTuBoo. Nếu bạn vi phạm tài khoản của bạn sẽ bị khóa vĩnh viễn!"
    const rejectContent = "Thông tin tài khoản của bạn đã bị hủy. Chúng tôi nhận thấy profile của bạn có nhiều thông tin không chứng thực. Bạn có thể phản hồi bằng cách truy cập web của TaTuboo <a href='http://localhost:5173'>tại đây</a> để phản hồi với quản trị viên hoặc liên hệ vào email admintatuboo@gmail.com để phẩn hồi thông báo này."
    const subject = "THÔNG BÁO KIỂM DUYỆT THÔNG TIN TÀI KHOẢN"
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
                  <p style="margin-bottom:10px">TaTuBoo thông báo: ${RegisterStatus === 3 ? confirmContent : rejectContent}</p>
                  <p>${RegisterStatus === 3 ? noteContent : ""}</p>
                </body>
                </html>
                `
    await sendEmail(Email, subject, content)
    return response(user, false, "Update thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncPushSubjectForTeacher = async (req) => {
  try {
    const SubjectID = req.params.SubjectID
    const TeacherID = req.user.ID
    const user = await User.findOneAndUpdate(
      { _id: TeacherID },
      {
        $push: { Subjects: SubjectID }
      },
      { new: true }
    )
    if (!user) return response({}, true, "Người dùng không tồn tại", 200)
    return response(user, false, "Thêm thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const UserSerivce = {
  fncGetDetailProfile,
  fncChangeProfile,
  fncSendRequestConfirmRegister,
  fncResponseConfirmRegister,
  fncPushSubjectForTeacher
}

export default UserSerivce

import Account from "../models/account.js"
import User from "../models/user.js"
import Subject from "../models/subject.js"
import { Roles, response } from "../utils/lib.js"
import sendEmail from "../utils/send-mail.js"
import { getOneDocument } from "../utils/queryFunction.js"

const fncGetDetailProfile = async (req) => {
  try {
    const UserID = req.user.ID
    const account = await getOneDocument(Account, "UserID", UserID)
    const user = await User
      .findOne({ _id: UserID })
      .populate("Subjects", ["_id", "SubjectName"])
    if (!user) return response({}, true, "Người dùng không tồn tại", 200)
    return response({ ...user._doc, Email: account.Email }, false, "Lấy ra thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncChangeProfile = async (req) => {
  try {
    const UserID = req.user.ID
    const { Email } = req.body
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
    if (!!Email) {
      await Account.findOneAndUpdate({ UserID }, { Email })
    }
    return response({ ...updateProfile._doc, Email: updateAccount.Email }, false, "Chỉnh sửa trang cá nhân thành công thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncRequestConfirmRegister = async (req) => {
  try {
    const UserID = req.user.ID
    const user = await User.findOneAndUpdate({ _id: UserID }, { RegisterStatus: 2 }, { new: true }).populate("Subjects", ["_id", "SubjectName"])
    return response(user, false, "Yêu cầu của bạn đã được gửi. Hệ thống sẽ phản hồi yêu cầu của bạn trong 48h!", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncResponseConfirmRegister = async (req) => {
  try {
    const { TeacherID, RegisterStatus, FullName } = req.body
    const user = await User.findOneAndUpdate({ _id: TeacherID }, { RegisterStatus }, { new: true })
    const account = await getOneDocument(Account, "UserID", user._id)
    const confirmContent = "Thông tin tài khoản của bạn đã được duyệt. Từ giờ bạn đã trở thành giáo viên của TaTuBoo và bạn đã có thể nhận học viên."
    const noteContent = "LƯU Ý: Hãy tuân thủ tất cả điều khoản của TaTuBoo. Nếu bạn vi phạm tài khoản của bạn sẽ bị khóa vĩnh viễn!"
    const rejectContent = "Thông tin tài khoản của bạn đã bị hủy. Chúng tôi nhận thấy profile của bạn có nhiều thông tin không chứng thực. Bạn có thể phản hồi để làm rõ."
    const subject = "THÔNG BÁO KIỂM DUYỆT PROFILE"
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
    await sendEmail(account.Email, subject, content)
    return response(user, false, "Update thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncPushSubjectForTeacher = async (req) => {
  try {
    const SubjectID = req.params.SubjectID
    const TeacherID = req.user.ID
    const user = await User
      .findOneAndUpdate(
        { _id: TeacherID },
        {
          $push: { Subjects: SubjectID }
        },
        { new: true }
      )
      .populate("Subjects", ["_id", "SubjectName"])
    return response(user, false, "Thêm thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetListTeacher = async (req) => {
  try {
    const { TextSearch, CurrentPage, PageSize, SubjectID, Level, RegisterStatus } = req.body
    let query = {
      FullName: { $regex: TextSearch, $options: "i" },
      RoleID: Roles.ROLE_TEACHER
    }
    if (!!SubjectID) {
      query = {
        ...query,
        Subjects: {
          $elemMatch: { $eq: SubjectID }
        }
      }
    }
    if (!!Level.length) {
      query = {
        ...query,
        "Quotes.Levels": { $all: Level }
      }
    }
    if (!!RegisterStatus) {
      query = {
        ...query,
        RegisterStatus: RegisterStatus
      }
    }
    const users = User
      .find(query)
      .populate("Subjects", ["_id", "SubjectName"])
      .skip((CurrentPage - 1) * PageSize)
      .limit(PageSize)
    const total = User.countDocuments(query)
    const result = await Promise.all([users, total])
    return response(
      {
        List: result[0],
        Total: result[1]
      },
      false,
      "Lay dat thanh cong",
      200
    )
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetListTeacherByUser = async (req) => {
  try {
    const { TextSearch, CurrentPage, PageSize, SubjectID, Level, FromPrice, ToPrice, LearnType, SortByPrice } = req.body
    let subject = {}
    let query = {
      FullName: { $regex: TextSearch, $options: "i" },
      RoleID: Roles.ROLE_TEACHER,
      RegisterStatus: 3,
      IsActive: true,
    }
    if (!!SubjectID) {
      query = {
        ...query,
        Subjects: {
          $elemMatch: { $eq: SubjectID }
        }
      }
      subject = await getOneDocument(Subject, "_id", SubjectID)
    }
    if (!!Level.length) {
      query = {
        ...query,
        "Quotes.Levels": { $all: Level }
      }
    }
    if (!!LearnType.length) {
      query = {
        ...query,
        LearnTypes: { $all: LearnType }
      }
    }
    if (!!FromPrice && !!ToPrice) {
      query = {
        ...query,
        Price: { $gte: FromPrice, $lte: ToPrice }
      }
    }
    const users = User
      .find(query)
      .sort({ Price: SortByPrice })
      .populate("Subjects", ["_id", "SubjectName"])
      .skip((CurrentPage - 1) * PageSize)
      .limit(PageSize)
    const total = User.countDocuments(query)
    const result = await Promise.all([users, total])
    return response(
      {
        Subject: subject,
        List: result[0],
        Total: result[1]
      },
      false,
      "Lay dat thanh cong",
      200
    )
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetDetailTeacher = async (req) => {
  try {
    const { TeacherID, SubjectID } = req.body
    const teacher = await User
      .findOne({
        _id: TeacherID,
        RegisterStatus: 3,
        IsActive: true,
        Subjects: {
          $elemMatch: { $eq: SubjectID }
        }
      })
      .populate("Subjects", ["_id", "SubjectName"])
    if (!teacher) return response({}, true, "Giáo viên không tồn tại", 200)
    return response(teacher, false, "Lấy data thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const UserSerivce = {
  fncGetDetailProfile,
  fncChangeProfile,
  fncRequestConfirmRegister,
  fncResponseConfirmRegister,
  fncPushSubjectForTeacher,
  fncGetListTeacher,
  fncGetListTeacherByUser,
  fncGetDetailTeacher
}

export default UserSerivce

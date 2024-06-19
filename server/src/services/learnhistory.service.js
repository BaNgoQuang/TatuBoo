import LearnHistory from "../models/learnhistory.js"
import { response } from "../utils/lib.js"
import sendEmail from "../utils/send-mail.js"

const fncCreateLearnHistory = async (req) => {
  try {
    const UserID = req.user.ID
    const { TeacherName, StudentName, SubjectName, TeacherEmail, Times, ...remainBody } = req.body
    const newLearnHistory = await LearnHistory.create({ ...remainBody, Student: UserID })
    const subject = "THÔNG BÁO HỌC SINH ĐĂNG KÝ HỌC"
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
                  <p style="margin-top: 30px; margin-bottom:10px">Xin chào ${TeacherName},</p>
                  <p style="margin-bottom:10px">TaTuBoo thông báo học sinh đăng ký học:</p>
                  <p>Tên học sinh: ${StudentName}</p>
                  <p>Môn học: ${SubjectName}</p>
                  <p>Thời gian học:</p>
                  ${Times.map(i =>
      `<p>${i}</p>`
    )}
                  <p>Giáo viên hãy vào lịch dạy của mình để kiểm tra thông tin lịch dạy.</p>
                </body>
                </html>
                `
    await sendEmail(TeacherEmail, subject, content)
    return response(newLearnHistory, false, "Thêm thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetListLearnHistory = async (req) => {
  try {
    const UserID = req.user.ID
    const { PageSize, CurrentPage } = req.body
    const list = LearnHistory
      .find({ Student: UserID })
      .skip((CurrentPage - 1) * PageSize)
      .limit(PageSize)
      .populate("Teacher", ["_id", "FullName"])
      .populate("Student", ["_id", "FullName"])
      .populate("Subject", ["_id", "SubjectName"])
    const total = LearnHistory.countDocuments({ Student: UserID })
    const result = await Promise.all([list, total])
    return response({ List: result[0], Total: result[1] }, false, "Lấy data thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const LearnHistoryService = {
  fncCreateLearnHistory,
  fncGetListLearnHistory
}

export default LearnHistoryService

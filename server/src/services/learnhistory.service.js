import mongoose from "mongoose"
import LearnHistory from "../models/learnhistory.js"
import { response } from "../utils/lib.js"
import sendEmail from "../utils/send-mail.js"

const fncCreateLearnHistory = async (req) => {
  try {
    const UserID = req.user.ID
    const { TeacherName, StudentName, SubjectName, StudentEmail, TeacherEmail, Times, ...remainBody } = req.body
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
                  <p>Email học sinh: ${StudentEmail}</p>
                  <p>Môn học: ${SubjectName}</p>
                  <p>Thời gian học:</p>
                  ${Times.map(i =>
      `<div>${i}</div>`
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
    const { PageSize, CurrentPage, LearnedStatus, TextSearch } = req.body
    let query = {
      Student: new mongoose.Types.ObjectId(`${UserID}`),
    }
    if (!!LearnedStatus) {
      query = {
        ...query,
        LearnedStatus
      }
    }
    const list = LearnHistory.aggregate([
      {
        $match: query
      },
      {
        $lookup: {
          from: "users",
          localField: "Student",
          foreignField: "_id",
          as: "Student",
        }
      },
      { $unwind: '$Student' },
      {
        $lookup: {
          from: "users",
          localField: "Teacher",
          foreignField: "_id",
          as: "Teacher",
        }
      },
      { $unwind: '$Teacher' },
      {
        $lookup: {
          from: "subjects",
          localField: "Subject",
          foreignField: "_id",
          as: "Subject",
        }
      },
      { $unwind: '$Subject' },
      {
        $match: {
          $or: [
            { 'Subject.SubjectName': { $regex: TextSearch, $options: 'i' } },
            { 'Teacher.FullName': { $regex: TextSearch, $options: 'i' } }
          ]
        }
      },
      {
        $project: {
          _id: 1,
          TotalLearned: 1,
          LearnedNumber: 1,
          LearnedStatus: 1,
          RegisterDate: 1,
          'Teacher._id': 1,
          'Teacher.FullName': 1,
          'Student._id': 1,
          'Student.FullName': 1,
          'Subject._id': 1,
          'Subject.SubjectName': 1,
        }
      },
      { $limit: PageSize },
      { $skip: (CurrentPage - 1) * PageSize }
    ])
    const total = LearnHistory.aggregate([
      {
        $match: query
      },
      {
        $lookup: {
          from: "subjects",
          localField: "Subject",
          foreignField: "_id",
          as: "Subject",
        }
      },
      { $unwind: '$Subject' },
      {
        $match: {
          $or: [
            { 'Subject.SubjectName': { $regex: TextSearch, $options: 'i' } },
            { 'Teacher.FullName': { $regex: TextSearch, $options: 'i' } }
          ]
        }
      },
      {
        $count: "total"
      }
    ])
    const result = await Promise.all([list, total])
    return response(
      {
        List: result[0],
        Total: !!result[1].length ? result[1][0].total : 0
      },
      false,
      "Lấy data thành công",
      200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const LearnHistoryService = {
  fncCreateLearnHistory,
  fncGetListLearnHistory
}

export default LearnHistoryService

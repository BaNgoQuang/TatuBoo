import TimeTable from "../models/timetable.js"
import BankingInfor from "../models/bankinginfor.js"
import User from "../models/user.js"
import Payment from "../models/payment.js"
import Report from "../models/report.js"
import { ADMIN_ID } from "../services/message.service.js"
import { randomNumber } from "../utils/commonFunction.js"

const getListPaymentInCurrentWeek = async () => {
  try {
    const today = new Date()

    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()))
    startOfWeek.setHours(0, 0, 0, 0)
    const endOfWeek = new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000)
    endOfWeek.setHours(23, 59, 59, 999)
    console.log(startOfWeek + endOfWeek)

    let query = {
      DateAt: { $gte: startOfWeek, $lte: endOfWeek },
    }
    const timeTable = TimeTable
      .find(query)
    const total = TimeTable.countDocuments(query)
    const result = await Promise.all([timeTable, total])

    const teacherCounts = {}
    result[0].forEach((timetable) => {
      teacherCounts[timetable.Teacher.toString()] = (teacherCounts[timetable.Teacher.toString()] || 0) + 1
    })

    const reportData = []
    for (const timetable of result[0]) {
      const reportInfor = await Report.findOne({ Timetable: timetable._id }).populate({ path: 'Timetable', select: 'Teacher' })
      reportData.push(reportInfor)
    }

    const teacherCountsReport = {}
    reportData.forEach((report) => {
      if (report != null) {
        teacherCountsReport[report.Timetable.Teacher.toString()] = (teacherCountsReport[report.Timetable.Teacher.toString()] || 0) + 1
      }
    })

    const teacherData = []
    for (const teacherId in teacherCounts) {
      const teacherBankingInfor = await BankingInfor.findOne({ User: teacherId })
      const teacherName = await User.findById(teacherId).then((user) => user.FullName)
      const teacherPrice = await User.findById(teacherId).then((user) => user.Price)
      const salary = teacherPrice * teacherCounts[teacherId] * 1000
      const teacherPayment = await Payment.findOne({ Receiver: teacherId, PaymentTime: { $gte: startOfWeek, $lte: endOfWeek } })

      if (!teacherPayment) {
        let createPayment = await Payment.create({
          Sender: ADMIN_ID,
          Receiver: teacherId,
          PaymentType: 3,
          TraddingCode: randomNumber(),
          TotalFee: salary,
          Description: "Thanh toán tiền dạy học cho giảng viên " + teacherName,
          PaymentStatus: 1,
        })
        teacherPayment = createPayment
      }

      teacherData.push({
        teacherId: teacherId,
        teacherName,
        teachingSessions: teacherCounts[teacherId],
        teacherPrice,
        salary,
        teacherBankingInfor,
        teacherPayment,
        teacherReport: teacherCountsReport[teacherId] ? teacherCountsReport[teacherId] : 0,
      })
    }
  } catch (error) {
    console.log("error", error.toString())
  }
}

export default getListPaymentInCurrentWeek

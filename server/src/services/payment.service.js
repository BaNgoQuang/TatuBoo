import * as dotenv from "dotenv"
dotenv.config()
import { response } from "../utils/lib.js"
import ExcelJS from "exceljs"
import Payment from "../models/payment.js"
import { formatMoney, getCurrentWeekRange } from "../utils/commonFunction.js"
import sendEmail from "../utils/send-mail.js"

const PaymentType = [
  {
    Key: 1,
    Name: "Thanh toán book giáo viên"
  },
  {
    Key: 2,
    Name: "Hoàn tiền"
  },
  {
    Key: 3,
    Name: "Thanh toán tiền dạy cho giáo viên"
  }
]

const PaymentStatus = [
  {
    Key: 1,
    Name: "Chờ thanh toán"
  },
  {
    Key: 2,
    Name: "Đã thanh toán"
  },
  {
    Key: 3,
    Name: "Hủy thanh toán"
  }
]

const fncCreatePayment = async (req) => {
  try {
    const UserID = req.user.ID
    const newPayment = await Payment.create({ ...req.body, Sender: UserID })
    return response(newPayment, false, "Lấy link thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetListPaymentHistoryByUser = async (req) => {
  try {
    const UserID = req.user.ID
    const { PageSize, CurrentPage, TraddingCode, PaymentStatus, PaymentType } = req.body
    let query = {
      Sender: UserID,
      TraddingCode: { $regex: TraddingCode, $options: "i" }
    }
    if (!!PaymentStatus) {
      query = {
        ...query,
        PaymentStatus: PaymentStatus
      }
    }
    if (!!PaymentType) {
      query = {
        ...query,
        PaymentType: PaymentType
      }
    }
    const payments = Payment
      .find(query)
      .skip((CurrentPage - 1) * PageSize)
      .limit(PageSize)
    const total = Payment.countDocuments(query)
    const result = await Promise.all([payments, total])
    return response(
      { List: result[0], Total: result[1] },
      false,
      "Lay data thanh cong",
      200
    )
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncChangePaymentStatus = async (req) => {
  try {
    const UserID = req.user.ID
    const { PaymentID, PaymentStatus, TotalFee, FullName, Email } = req.body
    const updatePayment = await Payment.findOneAndUpdate({ _id: PaymentID, Sender: UserID }, { PaymentStatus })
    if (!updatePayment) return response({}, true, "Có lỗi xảy ra", 200)
    const subject = "THÔNG BÁO THANH TOÁN TIỀN GIẢNG DẠY"
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
                  <p style="margin-top: 30px; margin-bottom:30px; text-align:center">THÔNG BÁO THANH TOÁN TIỀN GIẢNG DẠY</p>
                  <p style="margin-bottom:10px">Xin chào ${FullName},</p>
                  <p style="margin-bottom:10px">Chúng tôi đã hoàn tất quá trình thanh toán tiền giảng dạy cho 1 tuần vừa qua của bạn với số tiền là ${formatMoney(TotalFee)}VNĐ. Vui lòng đăng nhập ngân hàng để kiểm tra số tài khoản</p>
                  <p style="margin-top: 30px; margin-bottom:10px">Mọi thắc mắc vui lòng gửi đến địa chỉ email này.</p>
                </body>
                </html>
                `
    await sendEmail(Email, subject, content)
    return response(updatePayment, false, "Thanh toán thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetListPayment = async (req) => {
  try {
    const { PageSize, CurrentPage, TextSearch, PaymentType } = req.body
    let query = {
      PaymentStatus: 2
    }
    if (!!PaymentType) {
      query = {
        ...query,
        PaymentType: PaymentType
      }
    }
    const payments = Payment.aggregate([
      {
        $match: query
      },
      {
        $lookup: {
          from: "users",
          localField: "Sender",
          foreignField: "_id",
          as: "Sender"
        }
      },
      { $unwind: '$Sender' },
      {
        $match: {
          $or: [
            { 'Sender.FullName': { $regex: TextSearch, $options: 'i' } },
            { TraddingCode: { $regex: TextSearch, $options: "i" } }
          ]
        }
      },
      {
        $project: {
          _id: 1,
          TraddingCode: 1,
          TotalFee: 1,
          Description: 1,
          PaymentStatus: 1,
          PaymentType: 1,
          PaymentTime: 1,
          'Sender._id': 1,
          'Sender.FullName': 1,
        }
      },
      { $skip: (CurrentPage - 1) * PageSize },
      { $limit: PageSize }
    ])
    const total = Payment.aggregate([
      {
        $match: query
      },
      {
        $lookup: {
          from: "users",
          localField: "Sender",
          foreignField: "_id",
          as: "Sender"
        }
      },
      { $unwind: '$Sender' },
      {
        $match: {
          $or: [
            { 'Sender.FullName': { $regex: TextSearch, $options: 'i' } },
            { TraddingCode: { $regex: TextSearch, $options: "i" } }
          ]
        }
      },
      {
        $count: "total"
      }
    ])
    const result = await Promise.all([payments, total])
    return response(
      {
        List: result[0],
        Total: !!result[1].length ? result[1][0].total : 0
      },
      false,
      "Lay data thanh cong",
      200
    )
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncExportExcel = async (res) => {
  try {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet("My payment")
    worksheet.columns = [
      { header: "STT", key: "STT", width: 10 },
      { header: "Mã giao dịch", key: "TraddingCode", width: 15 },
      { header: "Người giao dịch", key: "FullName", width: 25 },
      { header: "Nội dung giao dịch", key: "Description", width: 60 },
      { header: "Số tiền", key: "TotalFee", width: 20 },
      { header: "Loại thanh toán", key: "PaymentType", width: 40 },
      { header: "Trạng thái thanh toán", key: "PaymentStatus", width: 20 },
    ]
    const payments = await Payment.find().populate("Sender", ["_id", "FullName"])
    const listColumCenter = ['A', 'B', 'C', 'E', 'F', 'G']
    payments.forEach((payment, idx) => {
      const row = worksheet.addRow({
        STT: idx + 1,
        TraddingCode: payment.TraddingCode,
        FullName: payment.Sender.FullName,
        Description: payment.Description,
        TotalFee: payment.TotalFee,
        PaymentType: PaymentType.find(i => i.Key === payment.PaymentType).Name,
        PaymentStatus: PaymentStatus.find(i => i.Key === payment.PaymentStatus).Name,
      })
      listColumCenter.forEach(col => {
        row.getCell(col).alignment = { vertical: 'middle', horizontal: 'center' }
      })
    })
    worksheet.getRow(1).eachCell(cell => {
      cell.font = { bold: true }
      cell.alignment = { vertical: 'middle', horizontal: 'center' }
    })
    const file = await workbook.xlsx.writeBuffer()
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    res.setHeader('Content-Disposition', 'attachment; filename=payment.xlsx')
    res.send(file)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetListTransfer = async (req) => {
  try {
    const { PageSize, CurrentPage } = req.body
    const { startOfWeek, endOfWeek } = getCurrentWeekRange()
    const payments = await Payment.aggregate([
      {
        $match: {
          $or: [
            { PaymentType: 3 },
            { PaymentType: 2 }
          ],
          PaymentStatus: 1
        }
      },
      {
        $lookup: {
          from: "users",
          foreignField: "_id",
          localField: "Receiver",
          as: "Receiver",
          pipeline: [
            {
              $lookup: {
                from: "timetables",
                foreignField: "Teacher",
                localField: "_id",
                as: "TimeTables",
                pipeline: [
                  {
                    $match: {
                      "DateAt": { $gte: startOfWeek, $lte: endOfWeek },
                      "Status": true,
                    }
                  },
                  {
                    $lookup: {
                      from: "subjects",
                      localField: "Subject",
                      foreignField: "_id",
                      as: "Subject"
                    }
                  },
                  { $unwind: "$Subject" },
                  {
                    $project: {
                      _id: 1,
                      DateAt: 1,
                      StartTime: 1,
                      EndTime: 1,
                      LearnType: 1,
                      Address: 1,
                      "Subject.SubjectName": 1
                    }
                  }
                ]
              }
            },
            {
              $lookup: {
                from: "reports",
                foreignField: "Teacher",
                localField: "_id",
                as: "Reports",
                pipeline: [
                  {
                    $lookup: {
                      from: "users",
                      localField: "Sender",
                      foreignField: "_id",
                      as: "Sender"
                    }
                  },
                  { $unwind: "$Sender" },
                  {
                    $lookup: {
                      from: "users",
                      localField: "Teacher",
                      foreignField: "_id",
                      as: "Teacher"
                    }
                  },
                  { $unwind: "$Teacher" },
                  {
                    $project: {
                      _id: 1,
                      Title: 1,
                      Content: 1,
                      Timetable: 1,
                      "Sender._id": 1,
                      "Sender.FullName": 1,
                      "Teacher._id": 1,
                      "Teacher.FullName": 1,
                    }
                  }
                ]
              }
            },
            {
              $lookup: {
                from: "accounts",
                localField: "_id",
                foreignField: "UserID",
                as: "Account"
              }
            },
            { $unwind: '$Account' },
            {
              $addFields: {
                Email: "$Account.Email"
              }
            },
            {
              $project: {
                _id: 1,
                FullName: 1,
                TimeTables: 1,
                Reports: 1,
                Email: 1
              }
            },
          ]
        }
      },
      { $unwind: "$Receiver" }
    ])
    return response(payments, false, "Lấy data thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncSendRequestExplanation = async (req) => {
  try {
    const UserID = req.user.ID
    const { PaymentID, Email, FullName, Reports } = req.body
    const updatePayment = await Payment.findOneAndUpdate({ _id: PaymentID, Sender: UserID }, { RequestAxplanationAt: Date.now() })
    if (!updatePayment) return response({}, true, "Có lỗi xảy ra", 200)
    const subject = "THÔNG BÁO GIẢI TRÌNH BUỔI HỌC BỊ REPORT"
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
                  <p style="margin-top: 30px; margin-bottom:30px; text-align:center">THÔNG BÁO GIẢI TRÌNH BUỔI HỌC BỊ REPORT</p>
                  <p style="margin-bottom:10px">Xin chào ${FullName},</p>
                  <p style="margin-bottom:10px">TaTuBoo thông báo: Chúng tôi xin thông báo về các buổi học bạn bị report trong tuần qua:</p>
                  ${Reports.map((i, idx) =>
      `<div>
                    <p style="font-weight: 600; font-size: 18px">Lần report thứ ${idx + 1}</p>
                    <div>
                      Ngày học: ${i.DateAt}
                    </div>
                    <div>
                      Thời gian: ${i.Time}
                    </div>
                    <div>
                      Tiêu đề report: ${i.Title}
                    </div>
                    <div>
                      Nội dung report: ${i.Content}
                    </div>
                  </div>`
    )}
                  <p style="margin-top: 30px; margin-bottom:10px">Bạn phải giải trình về những report trên trong vòng 48h. Nếu trong vòng 48h bạn không giải trình thì bạn sẽ mất toàn bộ số tiền giảng dạy trong tuần qua và nếu hệ thống ghi nhận quá nhiều lần bị báo cáo hệ thống sẽ khóa tài khoản của bạn.</p>
                  <p style="margin-top: 30px; margin-bottom:10px">Mọi thắc mắc vui lòng gửi đến địa chỉ email này.</p>
                </body>
                </html>
                `
    await sendEmail(Email, subject, content)
    return response({}, false, "Đã gửi yêu cầu giải trình cho giáo viên", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const PaymentService = {
  fncCreatePayment,
  fncGetListPaymentHistoryByUser,
  fncChangePaymentStatus,
  fncGetListPayment,
  fncExportExcel,
  fncGetListTransfer,
  fncSendRequestExplanation
}

export default PaymentService

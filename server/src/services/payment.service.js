import * as dotenv from "dotenv"
dotenv.config()
import { response } from "../utils/lib.js"
import Payment from "../models/payment.js"
import ExcelJS from "exceljs"

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
    const { PageSize, CurrentPage, TraddingCode, PaymentStatus, FeeType } = req.body
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
    if (!!FeeType) {
      query = {
        ...query,
        FeeType: FeeType
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
    const { PaymentID, PaymentStatus } = req.body
    const updatePayment = await Payment.findOneAndUpdate({ _id: PaymentID, Sender: UserID }, { PaymentStatus })
    if (!updatePayment) return response({}, true, "Có lỗi xảy ra", 200)
    return response(updatePayment, false, "Sửa thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetListPayment = async (req) => {
  try {
    const { PageSize, CurrentPage, TraddingCode, Sender } = req.body
    let query
    if (!!TraddingCode) {
      query = {
        ...query,
        TraddingCode: { $regex: TraddingCode, $options: "i" }
      }
    }
    const payments = Payment
      .find(query)
      .populate("Sender", ["_id", "FullName"])
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

const PaymentService = {
  fncCreatePayment,
  fncGetListPaymentHistoryByUser,
  fncChangePaymentStatus,
  fncGetListPayment,
  fncExportExcel
}

export default PaymentService

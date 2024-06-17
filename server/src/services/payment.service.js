import * as dotenv from "dotenv"
dotenv.config()
import { response } from "../utils/lib.js"
import Payment from "../models/payment.js"

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
    const { PageSize, CurrentPage, TraddingCode, PaymentStatus } = req.body
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

const PaymentService = {
  fncCreatePayment,
  fncGetListPaymentHistoryByUser,
  fncChangePaymentStatus,
  fncGetListPayment
}

export default PaymentService

import PayOS from "@payos/node"
import * as dotenv from "dotenv"
dotenv.config()
import { response } from "../utils/lib.js"
import { randomNumber } from "../utils/commonFunction.js"
import Payment from "../models/payment.js"
import { handleListQuery } from "../utils/queryFunction.js"

const payos = new PayOS(process.env.BANK_CLIENTID, process.env.BANK_APIKEY, process.env.BANK_CHECKSUMKEY)

const fncCreatePaymentLink = async (req) => {
  try {
    const { TotalFee, Description, ReturnURL, CancelURL } = req.body
    const order = {
      amount: TotalFee,
      description: Description,
      orderCode: randomNumber(),
      returnUrl: ReturnURL,
      cancelUrl: CancelURL
    }
    const paymentLink = await payos.createPaymentLink(order)
    return response(paymentLink.checkoutUrl, false, "Lấy link thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

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
    const [PageSize, CurrentPage, TraddingCode] = req.body
    const payments = Payment
      .find(
        {
          Sender: UserID,
          TraddingCode: { $regex: TraddingCode, $options: "i" },
        })
      .skip((CurrentPage - 1) * PageSize)
      .limit(PageSize)
    const total = Payment.countDocuments({ Sender: UserID })
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
  fncCreatePaymentLink,
  fncCreatePayment,
  fncGetListPaymentHistoryByUser
}

export default PaymentService

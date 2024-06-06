import PayOS from "@payos/node"
import * as dotenv from "dotenv"
dotenv.config()
import { response } from "../utils/lib.js"
import { randomNumber } from "../utils/commonFunction.js"
import Payment from "../models/payment.js"

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
    const newPayment = await Payment.create({ ...req.body, SenderID: UserID })
    return response(newPayment, false, "Lấy link thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetListPaymentHistory = async (req) => {
  try {
    const UserID = req.user.ID
    const [PageSize, CurrentPage] = req.body
    const payments = await Payment
      .find({ SenderID: UserID })
      .skip((CurrentPage - 1) * PageSize)
      .limit(PageSize)
    // const total = await
    // return
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const PaymentService = {
  fncCreatePaymentLink,
  fncCreatePayment
}

export default PaymentService

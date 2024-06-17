import http from "../index"
import {
  apiCreatePaymentLink,
  apiCreatePayment,
  apiGetListPaymentHistoryByUser
} from "./urls"

const createPaymentLink = body => http.post(apiCreatePaymentLink, body)
const createPayment = body => http.post(apiCreatePayment, body)
const getListPaymentHistoryByUser = body => http.post(apiGetListPaymentHistoryByUser, body)

const PaymentService = {
  createPaymentLink,
  createPayment,
  getListPaymentHistoryByUser,
}

export default PaymentService

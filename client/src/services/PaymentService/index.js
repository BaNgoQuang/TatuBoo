import http from "../index"
import {
  apiCreatePaymentLink,
  apiCreatePayment
} from "./urls"

const createPaymentLink = body => http.post(apiCreatePaymentLink, body)
const createPayment = body => http.post(apiCreatePayment, body)

const PaymentService = {
  createPaymentLink,
  createPayment
}

export default PaymentService

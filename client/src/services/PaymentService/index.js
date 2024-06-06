import { getLocalStorage } from "src/lib/commonFunction"
import http from "../index"
import {
  apiCreatePaymentLink,
  apiCreatePayment
} from "./urls"

const createPaymentLink = body => http.post(apiCreatePaymentLink, body, {
  headers: {
    'token': `Bearer ${getLocalStorage("token")}`
  }
})
const createPayment = body => http.post(apiCreatePayment, body, {
  headers: {
    'token': `Bearer ${getLocalStorage("token")}`
  }
})

const PaymentService = {
  createPaymentLink,
  createPayment
}

export default PaymentService

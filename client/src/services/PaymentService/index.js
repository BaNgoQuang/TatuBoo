import http from "../index"
import axios from "axios"
import {
  apiCreatePaymentLink,
  apiCreatePayment,
  apiGetListPaymentHistoryByUser,
  apiChangePaymentStatus,
  apiGetListPayment
} from "./urls"

const CLIENTID = import.meta.env.VITE_BANK_CLIENTID
const APIKEY = import.meta.env.VITE_BANK_APIKEY

const createPaymentLink = body => axios.post(apiCreatePaymentLink, body, {
  headers: {
    "x-client-id": CLIENTID,
    "x-api-key": APIKEY
  }
})
const getDetailPaymentLink = PaymentLinkID => axios.get(`${apiCreatePaymentLink}/${PaymentLinkID}`, {
  headers: {
    "x-client-id": CLIENTID,
    "x-api-key": APIKEY
  }
})
const cancelPaymentLink = PaymentLinkID => axios.post(`${apiCreatePaymentLink}/${PaymentLinkID}/cancel`, {}, {
  headers: {
    "x-client-id": CLIENTID,
    "x-api-key": APIKEY
  }
})
const createPayment = body => http.post(apiCreatePayment, body)
const getListPaymentHistoryByUser = body => http.post(apiGetListPaymentHistoryByUser, body)
const changePaymentStatus = body => http.post(apiChangePaymentStatus, body)
const getListPayment = body => http.post(apiGetListPayment, body)

const PaymentService = {
  createPaymentLink,
  getDetailPaymentLink,
  cancelPaymentLink,
  createPayment,
  getListPaymentHistoryByUser,
  changePaymentStatus,
  getListPayment
}

export default PaymentService

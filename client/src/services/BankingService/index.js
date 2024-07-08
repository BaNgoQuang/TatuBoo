import http from "../index"
import axios from "axios"
import {
  apiCreateBankingInfor,
  apiGetDetailBankingInfor,
  apiGetInforBankAccount,
  apiGetListBank,
  apiGetListPaymentInCurrentWeek,
  apiUpdateBankingInfor
} from "./urls"

const CLIENTID = import.meta.env.VITE_VIETQR_CLIENTID
const APIKEY = import.meta.env.VITE_VIETQR_APIKEY

const getListBank = () => axios.get(apiGetListBank)
const getInforBankAccount = body => axios.post(apiGetInforBankAccount, body, {
  headers: {
    "x-client-id": CLIENTID,
    "x-api-key": APIKEY
  }
})
const createBankingInfor = body => http.post(apiCreateBankingInfor, body)
const getDetailBankingInfor = () => http.get(apiGetDetailBankingInfor)
const updateBankingInfor = body => http.post(apiUpdateBankingInfor, body)
const getListPaymentInCurrentWeek = body => http.post(apiGetListPaymentInCurrentWeek, body)

const BankingService = {
  getListBank,
  getInforBankAccount,
  createBankingInfor,
  getDetailBankingInfor,
  updateBankingInfor,
  getListPaymentInCurrentWeek
}

export default BankingService

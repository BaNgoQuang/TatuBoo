import PaymentService from "../services/payment.service.js"

const createPayment = async (req, res) => {
  try {
    const response = await PaymentService.fncCreatePayment(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getListPaymentHistoryByUser = async (req, res) => {
  try {
    const response = await PaymentService.fncGetListPaymentHistoryByUser(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const changePaymentStatus = async (req, res) => {
  try {
    const response = await PaymentService.fncChangePaymentStatus(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getListPayment = async (req, res) => {
  try {
    const response = await PaymentService.fncGetListPayment(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const exportExcel = async (req, res) => {
  try {
    const response = await PaymentService.fncExportExcel(res)
    // return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const PaymentController = {
  createPayment,
  getListPaymentHistoryByUser,
  changePaymentStatus,
  getListPayment,
  exportExcel,
}

export default PaymentController

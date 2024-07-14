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
    await PaymentService.fncExportExcel(res)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getListTransfer = async (req, res) => {
  try {
    const response = await PaymentService.fncGetListTransfer(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const sendRequestExplanation = async (req, res) => {
  try {
    const response = await PaymentService.fncSendRequestExplanation(req)
    return res.status(response.statusCode).json(response)
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
  getListTransfer,
  sendRequestExplanation
}

export default PaymentController

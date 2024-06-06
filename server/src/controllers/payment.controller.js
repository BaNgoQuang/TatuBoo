import PaymentService from "../services/payment.service.js"

const createPaymentLink = async (req, res) => {
  try {
    const response = await PaymentService.fncCreatePaymentLink(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const createPayment = async (req, res) => {
  try {
    const response = await PaymentService.fncCreatePayment(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const PaymentController = {
  createPaymentLink,
  createPayment
}

export default PaymentController

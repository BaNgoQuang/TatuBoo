import BankingInforService from "../services/bankinginfor.service.js"

const createBankingInfor = async (req, res) => {
  try {
    const response = await BankingInforService.fncCreateBankingInfor(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getDetailBankingInfor = async (req, res) => {
  try {
    const response = await BankingInforService.fncGetDetailBankingInfor(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getListBankingInfor = async (req, res) => {
  try {
    const response = await BankingInforService.fncGetListBankingInfor(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const deleteBankingInfor = async (req, res) => {
  try {
    const response = await BankingInforService.fncDeleteBankingInfor(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const updateBankingInfor = async (req, res) => {
  try {
    const response = await BankingInforService.fncUpdateBankingInfor(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const BankingInforController = {
  createBankingInfor,
  getDetailBankingInfor,
  deleteBankingInfor,
  updateBankingInfor,
  getListBankingInfor
}

export default BankingInforController

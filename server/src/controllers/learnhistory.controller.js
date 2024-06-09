import LearnHistoryService from "../services/learnhistory.service.js"


const createLearnHistory = async (req, res) => {
  try {
    const response = await LearnHistoryService.fncCreateLearnHistory(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getListLearnHistory = async (req, res) => {
  try {
    const response = await LearnHistoryService.fncGetListLearnHistory(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const LearnHistoryController = {
  createLearnHistory,
  getListLearnHistory
}

export default LearnHistoryController

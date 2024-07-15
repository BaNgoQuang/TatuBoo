import ReportService from "../services/report.service.js"

const createReport = async (req, res) => {
  try {
    const response = await ReportService.fncCreateReport(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getListReport = async (req, res) => {
  try {
    const response = await ReportService.fncGetListReport(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getListReportTimeTable = async (req, res) => {
  try {
    const response = await ReportService.fncGetListReportTimeTable(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const deletedReport = async (req, res) => {
  try {
    const response = await ReportService.fncDeleteReport(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const handleReport = async (req, res) => {
  try {
    const response = await ReportService.fcnHandleReport(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const ReportController = {
  createReport,
  getListReport,
  deletedReport,
  getListReportTimeTable,
  handleReport
}

export default ReportController

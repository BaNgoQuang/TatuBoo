import ReportService from "../services/report.service.js"

const createReport= async (req, res) => {
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

const getReportDetail = async (req, res) => {
    try {
      const response = await ReportService.fncGetReportDetail(req)
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

const changeHandleReport = async (req, res) => {
    try {
      const response = await ReportService.fncChangeHandelReport(req)
      return res.status(response.statusCode).json(response)
    } catch (error) {
      return res.status(500).json(error.toString())
    }
}


const ReportController = {
    createReport,
    getListReport,
    getReportDetail,
    deletedReport,
    changeHandleReport
}
    
export default ReportController
    
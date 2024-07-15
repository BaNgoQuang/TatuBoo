import http from "../index"
import {
  apiCreateReport,
  apiGetListReport
} from "./urls"

const createReport = body => http.post(apiCreateReport, body)
const getListReport = body => http.post(apiGetListReport, body)

const ReportService = {
  createReport,
  getListReport,
}

export default ReportService

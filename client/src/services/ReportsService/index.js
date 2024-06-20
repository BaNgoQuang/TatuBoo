import http from "../index"
import {
  apiCreateReport,
  apiGetListReport
} from "./urls"

const createReport = body => http.post(apiCreateReport, body)
const getListReport = body => http.post(apiGetListReport, body)

const ReportsService = {
  createReport,
  getListReport,
}

export default ReportsService

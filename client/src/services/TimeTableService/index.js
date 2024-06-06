import http from "../index"
import {
  apiCreateTimeTable,
  apiGetTimeTableByUser
} from "./urls"

const createTimeTable = body => http.post(apiCreateTimeTable, body)
const getTimeTableByUser = () => http.get(apiGetTimeTableByUser)

const TimeTableService = {
  createTimeTable,
  getTimeTableByUser
}

export default TimeTableService

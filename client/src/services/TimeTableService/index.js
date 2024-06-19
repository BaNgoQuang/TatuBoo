import http from "../index"
import {
  apiAttendanceTimeTable,
  apiCreateTimeTable,
  apiGetTimeTableByUser
} from "./urls"

const createTimeTable = body => http.post(apiCreateTimeTable, body)
const getTimeTableByUser = () => http.get(apiGetTimeTableByUser)
const attendanceTimeTable = TimeTableID => http.get(`${apiAttendanceTimeTable}/${TimeTableID}`)

const TimeTableService = {
  createTimeTable,
  getTimeTableByUser,
  attendanceTimeTable
}

export default TimeTableService

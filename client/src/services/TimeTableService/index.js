import { getLocalStorage } from "src/lib/commonFunction"
import http from "../index"
import {
  apiCreateTimeTable,
  apiGetTimeTableByUser
} from "./urls"

const createTimeTable = body => http.post(apiCreateTimeTable, body, {
  headers: {
    'token': `Bearer ${getLocalStorage("token")}`
  }
})
const getTimeTableByUser = () => http.get(apiGetTimeTableByUser, {
  headers: {
    'token': `Bearer ${getLocalStorage("token")}`
  }
})

const TimeTableService = {
  createTimeTable,
  getTimeTableByUser
}

export default TimeTableService

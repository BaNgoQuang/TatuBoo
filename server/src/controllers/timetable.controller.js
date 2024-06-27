import TimeTableService from "../services/timetable.service.js"

const createTimeTable = async (req, res) => {
  try {
    const response = await TimeTableService.fncCreateTimeTable(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getTimeTableByUser = async (req, res) => {
  try {
    const response = await TimeTableService.fncGetTimeTableByUser(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const attendanceTimeTable = async (req, res) => {
  try {
    const response = await TimeTableService.fncAttendanceTimeTable(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const updateTimeTable = async (req, res) => {
  try {
    const response = await TimeTableService.fncUpdateTimeTable(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const TimeTableController = {
  createTimeTable,
  getTimeTableByUser,
  attendanceTimeTable,
  updateTimeTable
}

export default TimeTableController

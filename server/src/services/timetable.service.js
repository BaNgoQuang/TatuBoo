import TimeTable from "../models/timetable.js"
import { Roles, response } from "../utils/lib.js"

const fncCreateTimeTable = async (req) => {
  try {
    const UserID = req.user.ID
    const data = req.body.map(i => ({
      ...i,
      Student: UserID
    }))
    const newTimeTable = await TimeTable.insertMany(data, { ordered: true })
    return response(newTimeTable, false, "Thêm thành công", 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetTimeTableByUser = async (req) => {
  try {
    const { ID, RoleID } = req.user
    const timetables = await TimeTable
      .find({
        [RoleID === Roles.ROLE_STUDENT ? "Student" : "Teacher"]: ID
      })
      .populate("Teacher", ["_id", "FullName"])
      .populate("Subject", ["_id", "SubjectName"])
    return response(timetables, false, "Lấy data thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const TimeTableService = {
  fncCreateTimeTable,
  fncGetTimeTableByUser
}

export default TimeTableService

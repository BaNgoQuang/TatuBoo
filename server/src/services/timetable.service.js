import TimeTable from "../models/timetable.js"
import LearnHistory from "../models/learnhistory.js"
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
      .populate("Student", ["_id", "FullName"])
      .populate("Subject", ["_id", "SubjectName"])
    return response(timetables, false, "Lấy data thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncAttendanceTimeTable = async (req) => {
  try {
    // const UserID = req.user.ID
    const TimeTableID = req.params.TimeTableID
    const timetable = await TimeTable.findOneAndUpdate({ _id: TimeTableID }, { Status: true }, { new: true })
    if (!timetable) return response({}, true, "Có lỗi xảy ra", 200)
    const learnHistory = await LearnHistory
      .findOneAndUpdate(
        { _id: timetable.LearnHistory },
        {
          $inc: {
            LearnedNumber: 1
          }
        },
        { new: true }
      )
    if (!learnHistory) return response({}, true, "Có lỗi xảy ra", 200)
    if (learnHistory.LearnedNumber === learnHistory.TotalLearned) {
      await LearnHistory
        .findOneAndUpdate(
          { _id: timetable.LearnHistory },
          {
            LearnedStatus: 2
          },
          { new: true }
        )
    }
    return response({}, false, "Điểm danh thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const TimeTableService = {
  fncCreateTimeTable,
  fncGetTimeTableByUser,
  fncAttendanceTimeTable
}

export default TimeTableService

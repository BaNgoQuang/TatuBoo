import { response } from "../utils/lib.js"
import Report from "../models/report.js"

const fncCreateReport = async (req) => {
  try {
    const newCreateReport = await Report.create(req.body)
    return response(newCreateReport, false, "Tạo Report thành công", 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetListReport = async (req) => {
  try {
    const { CurrentPage, PageSize } = req.body
    const query = { IsDeleted: false }
    const reports = Report
      .find(query)
      .populate("Sender", ["_id", "FullName"])
      .skip((CurrentPage - 1) * PageSize)
      .limit(PageSize)
    const total = Report.countDocuments(query)
    const result = await Promise.all([reports, total])
    return response(
      { List: result[0], Total: result[1] },
      false,
      "Lấy ra Report thành công",
      200
    )
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetListReportTimeTable = async (req) => {
  try {
    const { CurrentPage, PageSize } = req.body
    const query = { IsDeleted: false }
    const reports = Report
      .find(query)
      .skip((CurrentPage - 1) * PageSize)
      .limit(PageSize)
      .populate({
        path: 'Timetable',
        populate: [
          { path: 'Teacher', model: 'Users', select: ['_id', 'FullName'] },
          { path: 'Student', model: 'Users', select: ['_id', 'FullName'] }
        ]
      })
    const total = Report.countDocuments(query)
    const result = await Promise.all([reports, total])
    const responseList = []
    for (const report of result[0]) {
      const reportData = {
        ReportID: report._id,
        TeacherID: report.Timetable.Teacher._id,
        TeacherFullName: report.Timetable.Teacher.FullName,
        StudentID: report.Timetable.Student._id,
        StudentFullName: report.Timetable.Student.FullName,
        Title: report.Title,
        Context: report.Context,
        IsHandle: report.IsHandle,
        IsDeleted: report.IsDeleted
      }
      responseList.push(reportData)
    }
    return response(
      { List: responseList, Total: result[1] },
      false,
      "Lấy ra Report thành công",
      200
    )
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncDeleteReport = async (req) => {
  try {
    const ReportID = req.params.ReportID
    const deletedReport = await Blog.findByIdAndUpdate(
      ReportID,
      { IsDeleted: true },
      { new: true }
    )
    if (!deletedReport) return response({}, true, "Report không tồn tại", 200)
    return response(deletedReport, false, "Xoá report thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const ReportService = {
  fncCreateReport,
  fncGetListReport,
  fncDeleteReport,
  fncGetListReportTimeTable
}

export default ReportService

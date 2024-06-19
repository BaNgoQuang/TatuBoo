import { response } from "../utils/lib.js"
import { getOneDocument } from "../utils/queryFunction.js"
import Report from "../models/report.js"

const fncCreateReport = async (req) => {
  try {
    const newCreateReport = await Report.create(req.body)
    return response(newCreateReport, false, "Tạo Report thành công", 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetReportDetail = async (req) => {
  try {
    const ReportID = req.param.ReportID
    const report = await getOneDocument(Report, "_id", ReportID)
    if (!report) return response({}, true, "Report không tồn tại", 200)
    return response(report, true, "Report tồn tại", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetListReport = async (req) => {
  try {
    const { CurrentPage, PageSize } = req.body
    const query = { IsDeleted: false };
    const reports = Report
      .find(query)
      .skip((CurrentPage - 1) * PageSize)
      .limit(PageSize);
    const total = Report.countDocuments(query);
    const result = await Promise.all([reports, total]);
    return response(
      { List: result[0], Total: result[1] },
      false,
      "Lấy ra Report thành công",
      200
    );
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncDeleteReport = async (req) => {
  try {
    const ReportID = req.param.ReportID
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

const fncChangeHandelReport = async (req) => {
  try {
    const ReportID = req.param.ReportID
    const changeHandle = await Blog.findByIdAndUpdate(
      ReportID,
      { IsHandle: true },
      { new: true }
    )
    if (!changeHandle) return response({}, true, "Report không tồn tại", 200)
    return response(changeHandle, false, "Cập nhật xử lý thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const ReportService = {
  fncCreateReport,
  fncGetListReport,
  fncGetReportDetail,
  fncDeleteReport,
  fncChangeHandelReport
}

export default ReportService
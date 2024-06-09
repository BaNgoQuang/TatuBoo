import LearnHistory from "../models/learnhistory.js"
import { response } from "../utils/lib.js"

const fncCreateLearnHistory = async (req) => {
  try {
    const UserID = req.user.ID
    const newLearnHistory = await LearnHistory.create({ ...req.body, Student: UserID })
    return response(newLearnHistory, false, "Thêm thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetListLearnHistory = async (req) => {
  try {
    const UserID = req.user.ID
    const { PageSize, CurrentPage } = req.body
    const list = await LearnHistory.find({ Student: UserID }).skip((CurrentPage - 1) * PageSize).limit(PageSize)
    return response(list, false, "Lấy data thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const LearnHistoryService = {
  fncCreateLearnHistory,
  fncGetListLearnHistory
}

export default LearnHistoryService

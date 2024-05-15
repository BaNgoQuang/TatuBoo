import SubjectCates from "../models/subjectcate.js"
import { response } from "../utils/lib.js"

const fncCreateSubjectCate = async (req) => {
  const { SubjectCateName, Description } = req.body
  try {
    // Tạo mới SubjectCate
    const newSubjectCate = await SubjectCates.create({
      SubjectCateName,
      Description
    })
    return response({}, false, "Create SubjectCate successfully", 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}


const fncGetListSubjectCate = async (req) => {
  try {
    const { TextSearch, CurrentPage, PageSize } = req.body
    const SubjectCate = await SubjectCates
      .find({
        SubjectCateName: { $regex: TextSearch, $options: "i" },
        IsDeleted: false,
      })
      .skip((CurrentPage - 1) * PageSize)
      .limit(PageSize)

    const total = await SubjectCates.countDocuments()
    return response(
      { List: SubjectCate, Total: total },
      false,
      "Lấy ra thành công",
      200
    )
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const SubjectCateService = {
  fncCreateSubjectCate,
  fncGetListSubjectCate,
}

export default SubjectCateService

import SubjectCate from "../models/subjectcate.js"
import { getOneDocument } from "../utils/commonFunction.js"
import { response } from "../utils/lib.js"

const fncCreateSubjectCate = async (req) => {
  try {
    const { SubjectCateName, Description } = req.body
    const subjectCate = await getOneDocument(SubjectCate, "SubjectCateName", SubjectCateName)
    if (!!subjectCate) return response({}, true, "Loại môn đã tồn tại", 200)
    const newSubjectCate = await SubjectCate.create({
      SubjectCateName,
      Description
    })
    return response(newSubjectCate, false, "Tạo mới môn học thành công", 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}


const fncGetListSubjectCate = async (req) => {
  try {
    const { TextSearch, CurrentPage, PageSize } = req.body
    const subjectCates = await SubjectCate
      .find({
        SubjectCateName: { $regex: TextSearch, $options: "i" },
        IsDeleted: false,
      })
      .skip((CurrentPage - 1) * PageSize)
      .limit(PageSize)

    const total = await SubjectCate.countDocuments()
    return response(
      { List: subjectCates, Total: total },
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

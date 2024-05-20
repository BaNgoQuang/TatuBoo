import Subject from "../models/subject.js"
import { getOneDocument } from "../utils/commonFunction.js"
import { response } from "../utils/lib.js"

const fncCreateSubject = async (req) => {
  try {
    const { SubjectCateID, SubjectName } = req.body
    const subject = await getOneDocument(Subject, "SubjectName", SubjectName)
    if (!!subject) return response({}, true, `Môn ${SubjectName} đã tồn tại`, 200)
    const newSubject = await Subject.create({ SubjectCateID, SubjectName, AvatarPath: req.file.path })
    return response(newSubject, false, "Create Subject suscessfully", 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetListSubject = async (req) => {
  try {
    const { TextSearch, CurrentPage, PageSize } = req.body
    const subject = await Subject
      .find({
        SubjectName: { $regex: TextSearch, $options: "i" },
        IsDeleted: false,
      })
      .skip((CurrentPage - 1) * PageSize)
      .limit(PageSize)

    const total = await Subject.countDocuments()
    return response(
      { List: subject, Total: total },
      false,
      "Lấy ra thành công",
      200
    )
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncUpdateSubject = async (req) => {
  try {
    const { SubjectCateID, SubjectName, SubjectID } = req.body
    const updatedSubject = await Subject.findByIdAndUpdate(
      SubjectID,
      { SubjectCateID, SubjectName },
      { new: true, runValidators: true }
    )
    if (!updatedSubject) return response({}, true, "Môn học không tồn tại", 200)
    return response(updatedSubject, false, "Cập nhật môn học thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const Subjectervice = {
  fncCreateSubject,
  fncGetListSubject,
  fncUpdateSubject,

}

export default Subjectervice

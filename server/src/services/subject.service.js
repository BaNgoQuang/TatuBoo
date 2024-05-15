import Subjects from "../models/subject.js"
import { response } from "../utils/lib.js"

const fncCreateSubject = async (req) => {
  const { SubjectCateID, SubjectName } = req.body
  try {
    const newSubject = new Subjects({ SubjectCateID, SubjectName })
    await newSubject.save()
    return response(newSubject, false, "Create Subject suscessfully", 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetListSubject = async (req) => {
  try {
    const { TextSearch, CurrentPage, PageSize } = req.body
    const Subject = await Subjects.find({
      SubjectName: { $regex: TextSearch, $options: "i" },
      IsDeleted: false,
    })
      .skip((CurrentPage - 1) * PageSize)
      .limit(PageSize)

    const total = await Subjects.countDocuments()
    return response(
      { List: Subject, Total: total },
      false,
      "Lấy ra thành công",
      200
    )
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncUpdateSubject = async (req) => {
  const { id } = req.params
  const { SubjectCateID, SubjectName } = req.body

  try {
    // Kiểm tra sự tồn tại của Subject trước khi cập nhật
    const subject = await Subjects.findById(id)

    if (!subject) {
      return response({}, true, "Subject not found", 200)
    }

    const updatedSubject = await Subjects.findByIdAndUpdate(
      id,
      { SubjectCateID, SubjectName, IsDeleted },
      { new: true, runValidators: true }
    )
    return response(updatedSubject, false, "Update Subject suscessfully", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const SubjectService = {
  fncCreateSubject,
  fncGetListSubject,
  fncUpdateSubject,

}

export default SubjectService

import Subject from "../models/subject.js"
import { response } from "../utils/lib.js"
import { getOneDocument } from "../utils/queryFunction.js"

const fncCreateSubject = async (req) => {
  try {
    const { SubjectCateID, SubjectName } = req.body
    const subject = await getOneDocument(Subject, "SubjectName", SubjectName)
    if (!!subject) return response({}, true, `Môn ${SubjectName} đã tồn tại`, 200)
    const newSubject = await Subject.create({ SubjectCateID, SubjectName, AvatarPath: req.file.path })
    return response(newSubject, false, "Tạo môn học thành công", 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetListSubject = async (req) => {
  try {
    const { TextSearch, CurrentPage, PageSize, SubjectCateID } = req.body
    let query = {
      SubjectName: { $regex: TextSearch, $options: "i" },
      IsDeleted: false
    }
    if (!!SubjectCateID) {
      query = {
        ...query,
        SubjectCateID: SubjectCateID
      }
    }
    const subject = Subject
      .find(query)
      .skip((CurrentPage - 1) * PageSize)
      .limit(PageSize)
    const total = Subject.countDocuments(query)
    const result = await Promise.all([subject, total])
    return response(
      { List: result[0], Total: result[1] },
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
    const checkExist = await getOneDocument(Subject, "_id", SubjectID)
    if (!checkExist) return response({}, true, "Môn học không tồn tại", 200)
    const checkExistName = await getOneDocument(Subject, "SubjectName", SubjectName)
    if (!!checkExistName && !checkExist._id.equals(checkExistName._id))
      return response({}, true, `Môn học ${SubjectName} đã tồn tại`, 200)
    const updatedSubject = await Subject.findByIdAndUpdate(
      SubjectID,
      {
        SubjectCateID,
        SubjectName,
        AvatarPath: !!req.file ? req.file.path : checkExist?.AvatarPath
      },
      { new: true, runValidators: true }
    )
    return response(updatedSubject, false, "Cập nhật môn học thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncDeleteSubject = async (req, res) => {
  try {
    const { SubjectID } = req.params
    const deletedSubject = await Subject.findByIdAndUpdate(
      SubjectID,
      { IsDeleted: true },
      { new: true }
    )
    return response(deletedSubject, false, "Xoá môn học thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetDetailSubject = async (req) => {
  try {
    const SubjectID = req.param.SubjectID
    const subject = await getOneDocument(Subject, "_id", SubjectID)
    if (!subject) return response({}, true, "Môn học không tồn tại", 200)
    return response(subject, true, "Môn học không tồn tại", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const Subjectervice = {
  fncCreateSubject,
  fncGetListSubject,
  fncUpdateSubject,
  fncDeleteSubject,
  fncGetDetailSubject
}

export default Subjectervice

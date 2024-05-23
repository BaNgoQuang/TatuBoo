import http from "../index"
import {
  apiCreateSubjectCate,
  apiDeleteSubjectCate,
  apiGetListSubjectCate,
  apiUpdateSubjectCate,
} from "./urls"

const createSubjectCate = body => http.post(apiCreateSubjectCate, body)
const getListSubjectCate = body => http.post(apiGetListSubjectCate, body)
const updateSubjectCate = body => http.put(apiUpdateSubjectCate, body)
const deleteSubjectCate = param => http.patch(`${apiDeleteSubjectCate}?SubjectCateID=${param}`)

const SubjectCateService = {
  createSubjectCate,
  getListSubjectCate,
  deleteSubjectCate,
  updateSubjectCate,
}

export default SubjectCateService

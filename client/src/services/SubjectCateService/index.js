import http from "../index"
import {
  apiCreateSubjectCate,
  apiGetListSubjectCate,
} from "./urls"

const createSubjectCate = body => http.post(apiCreateSubjectCate, body)
const getListSubjectCate = body => http.post(apiGetListSubjectCate, body)

const SubjectCateService = {
  createSubjectCate,
  getListSubjectCate
}

export default SubjectCateService

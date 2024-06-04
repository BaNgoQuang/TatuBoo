import { getLocalStorage } from "src/lib/commonFunction"
import http from "../index"
import {
  apiCreateSubjectCate,
  apiDeleteSubjectCate,
  apiGetDetailSubjectCate,
  apiGetListSubjectCate,
  apiGetListSubjectCateAndSubject,
  apiUpdateSubjectCate,
} from "./urls"

const createSubjectCate = body => http.post(apiCreateSubjectCate, body, {
  headers: {
    'token': `Bearer ${getLocalStorage("token")}`
  }
})
const getListSubjectCate = body => http.post(apiGetListSubjectCate, body)
const updateSubjectCate = body => http.post(apiUpdateSubjectCate, body, {
  headers: {
    'token': `Bearer ${getLocalStorage("token")}`
  }
})
const deleteSubjectCate = SubjectCateID => http.get(`${apiDeleteSubjectCate}/${SubjectCateID}`, {
  headers: {
    'token': `Bearer ${getLocalStorage("token")}`
  }
})
const getListSubjectCateAndSubject = () => http.get(apiGetListSubjectCateAndSubject)

const getDetailSubjectCate = body => http.post(apiGetDetailSubjectCate, body)

const SubjectCateService = {
  createSubjectCate,
  getListSubjectCate,
  deleteSubjectCate,
  updateSubjectCate,
  getListSubjectCateAndSubject,
  getDetailSubjectCate,
}

export default SubjectCateService

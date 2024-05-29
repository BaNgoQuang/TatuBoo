import { getLocalStorage } from "src/lib/commonFunction"
import http from "../index"
import {
  apiCreateSubjectCate,
  apiDeleteSubjectCate,
  apiGetListSubjectCate,
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

const SubjectCateService = {
  createSubjectCate,
  getListSubjectCate,
  deleteSubjectCate,
  updateSubjectCate,
}

export default SubjectCateService

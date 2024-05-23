import { getLocalStorage } from "src/lib/commonFunction"
import http from "../index"
import {
  apiCreateSubject,
  apiDeleteSubject,
  apiGetListSubject,
  apiUpdateSubject,
} from "./urls"

const createSubject = body => http.post(apiCreateSubject, body, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'token': `Bearer ${getLocalStorage("token")}`
  }
})
const getListSubject = body => http.post(apiGetListSubject, body)

const updateSubject = body => http.put(apiUpdateSubject, body)
const deleteSubject = param => http.patch(`${apiDeleteSubject}?SubjectID=${param}`)

const SubjectService = {
  createSubject,
  getListSubject,
  updateSubject,
  deleteSubject,
}

export default SubjectService

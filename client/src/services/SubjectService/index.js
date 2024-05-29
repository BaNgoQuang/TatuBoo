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

const updateSubject = body => http.post(apiUpdateSubject, body, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'token': `Bearer ${getLocalStorage("token")}`
  }
})
const deleteSubject = SubjectID => http.get(`${apiDeleteSubject}/${SubjectID}`, {
  headers: {
    'token': `Bearer ${getLocalStorage("token")}`
  }
})

const SubjectService = {
  createSubject,
  getListSubject,
  updateSubject,
  deleteSubject,
}

export default SubjectService

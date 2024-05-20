import { getLocalStorage } from "src/lib/commonFunction"
import http from "../index"
import {
  apiCreateSubject,
  apiGetListSubject,
} from "./urls"

const createSubject = body => http.post(apiCreateSubject, body, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'token': `Bearer ${getLocalStorage("token")}`
  }
})
const getListSubject = body => http.post(apiGetListSubject, body)

const SubjectService = {
  createSubject,
  getListSubject
}

export default SubjectService

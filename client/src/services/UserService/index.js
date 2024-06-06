import axios from "axios"
import http from "../index"
import {
  apiChangeProfile,
  apiGetDetailProfile,
  apiGetDetailTeacher,
  apiGetInforByGoogleLogin,
  apiGetListTeacher,
  apiGetListTeacherBySubject,
  apiGetListTeacherByUser,
  apiLogin,
  apiLoginByGoogle,
  apiPushSubjectForTeacher,
  apiRegister,
  apiRegisterByGoogle,
  apiRequestConfirmRegister,
  apiResponseConfirmRegister,
} from "./urls"

const getInforByGoogleLogin = (access_token) => axios.get(apiGetInforByGoogleLogin, {
  headers: {
    Authorization: `Bearer ${access_token}`
  }
})
const login = body => http.post(apiLogin, body)
const loginByGoogle = body => http.post(apiLoginByGoogle, body)
const register = body => http.post(apiRegister, body)
const registerByGoogle = body => http.post(apiRegisterByGoogle, body)
const getDetailProfile = () => http.get(apiGetDetailProfile)
const changeProfile = body => http.post(apiChangeProfile, body, {
  headers: {
    'Content-Type': 'multipart/form-data',
  }
})
const requestConfirmRegister = () => http.get(apiRequestConfirmRegister)
const responseConfirmRegister = body => http.post(apiResponseConfirmRegister, body)
const pushSubjectForTeacher = SubjectID => http.get(`${apiPushSubjectForTeacher}/${SubjectID}`)
const getListTeacher = body => http.post(apiGetListTeacher, body)
const getListTeacherBySubject = body => http.post(apiGetListTeacherBySubject, body)
const getDetailTeacher = body => http.post(apiGetDetailTeacher, body)
const getListTeacherByUser = body => http.post(apiGetListTeacherByUser, body)

const UserService = {
  getInforByGoogleLogin,
  login,
  loginByGoogle,
  register,
  registerByGoogle,
  getDetailProfile,
  changeProfile,
  requestConfirmRegister,
  responseConfirmRegister,
  pushSubjectForTeacher,
  getListTeacher,
  getListTeacherBySubject,
  getDetailTeacher,
  getListTeacherByUser
}

export default UserService

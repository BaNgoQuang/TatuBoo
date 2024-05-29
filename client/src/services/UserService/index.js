import { getLocalStorage } from "src/lib/commonFunction"
import http from "../index"
import {
  apiChangeProfile,
  apiGetDetailProfile,
  apiGetDetailTeacher,
  apiGetInforByGoogleLogin,
  apiGetListTeacher,
  apiGetListTeacherBySubject,
  apiLogin,
  apiLoginByGoogle,
  apiPushSubjectForTeacher,
  apiRegister,
  apiRegisterByGoogle,
  apiRequestConfirmRegister,
  apiResponseConfirmRegister,
} from "./urls"

const getInforByGoogleLogin = (access_token) => http.get(apiGetInforByGoogleLogin, {
  headers: {
    Authorization: `Bearer ${access_token}`
  }
})
const login = body => http.post(apiLogin, body)
const loginByGoogle = body => http.post(apiLoginByGoogle, body)
const register = body => http.post(apiRegister, body)
const registerByGoogle = body => http.post(apiRegisterByGoogle, body)
const getDetailProfile = token => http.get(apiGetDetailProfile, {
  headers: {
    'token': `Bearer ${token}`
  }
})
const changeProfile = body => http.post(apiChangeProfile, body, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'token': `Bearer ${getLocalStorage("token")}`
  }
})
const requestConfirmRegister = () => http.get(apiRequestConfirmRegister, {
  headers: {
    'token': `Bearer ${getLocalStorage("token")}`
  }
})
const responseConfirmRegister = body => http.post(apiResponseConfirmRegister, body, {
  headers: {
    'token': `Bearer ${getLocalStorage("token")}`
  }
})
const pushSubjectForTeacher = SubjectID => http.get(`${apiPushSubjectForTeacher}/${SubjectID}`, {
  headers: {
    'token': `Bearer ${getLocalStorage("token")}`
  }
})
const getListTeacher = body => http.post(apiGetListTeacher, body, {
  headers: {
    'token': `Bearer ${getLocalStorage("token")}`
  }
})
const getListTeacherBySubject = body => http.post(apiGetListTeacherBySubject, body)
const getDetailTeacher = body => http.post(apiGetDetailTeacher, body)

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
  getDetailTeacher
}

export default UserService

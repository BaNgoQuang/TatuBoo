import { getLocalStorage } from "src/lib/commonFunction"
import http from "../index"
import {
  apiChangeProfile,
  apiGetDetailProfile,
  apiGetInforByGoogleLogin,
  apiLogin,
  apiLoginByGoogle,
  apiRegister,
  apiRegisterByGoogle,
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

const UserService = {
  getInforByGoogleLogin,
  login,
  loginByGoogle,
  register,
  registerByGoogle,
  getDetailProfile,
  changeProfile
}

export default UserService

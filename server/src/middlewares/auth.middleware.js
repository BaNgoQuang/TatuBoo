import { response } from '../utils/lib.js'
import { decodeData } from '../utils/commonFunction.js'

const checkExistToken = (req) => {
  let check = false
  if (!!req.cookies.token) {
    check = true
  }
  return check
}

const authMiddleware = (Roles) => {
  return (req, res, next) => {
    if (!req.cookies.token) {
      return res.status(401).json(
        response({}, true, 'Không có token')
      )
    }
    const token = req.cookies.token
    const data = decodeData(token)
    if (!data) {
      return res.status(401).json(
        response({}, true, "Token không có dữ liệu")
      )
    }
    if (Roles.includes(data.RoleID)) {
      req.user = data
      next()
    } else {
      return res.status(403).json(
        response({}, true, 'Bạn không có quyền')
      )
    }
  }
}

export default authMiddleware

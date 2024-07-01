
import User from "../models/user.js"
import { Roles, response } from "../utils/lib.js"

const getResultData = (TotalTeacher, TotalStudent) => {
  return {
    TotalTeacher: TotalTeacher,
    TotalStudent: TotalStudent,
    Total: TotalTeacher + TotalStudent
  }
}

const getCurrentWeekRange = () => {
  const currentDate = new Date()
  const dayOfWeek = currentDate.getDay()
  const startOfWeek = new Date(currentDate)
  const endOfWeek = new Date(currentDate)

  startOfWeek.setDate(currentDate.getDate() - dayOfWeek)
  startOfWeek.setHours(0, 0, 0, 0)

  endOfWeek.setDate(currentDate.getDate() + (6 - dayOfWeek))
  endOfWeek.setHours(23, 59, 59, 999)

  return { startOfWeek, endOfWeek }
}

const fncStatisticTotalUser = async (req) => {
  try {
    const { FromDate, ToDate } = req.body
    const teacher = User.countDocuments({
      RoleID: Roles.ROLE_TEACHER,
      createdAt: {
        $gte: FromDate,
        $lte: ToDate
      }
    })
    const student = User.countDocuments({
      RoleID: Roles.ROLE_STUDENT,
      createdAt: {
        $gte: FromDate,
        $lte: ToDate
      }
    })
    const result = await Promise.all([teacher, student])
    return response(
      getResultData(result[0], result[1]),
      false,
      "Lấy data thành công",
      200
    )
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncStatisticNewRegisteredUser = async (req) => {
  try {
    const { Key } = req.query
    const currentDate = new Date()
    let teacher, student, result
    switch (Key) {
      case "Day":
        teacher = User.countDocuments({
          RoleID: Roles.ROLE_TEACHER,
          createdAt: Date.now()
        })
        student = User.countDocuments({
          RoleID: Roles.ROLE_STUDENT,
          createdAt: Date.now()
        })
        result = await Promise.all([teacher, student])
        return response(
          getResultData(result[0], result[1]),
          false,
          "Lấy data thành công",
          200
        )
      case "Week":
        const { startOfWeek, endOfWeek } = getCurrentWeekRange()
        teacher = User.countDocuments({
          RoleID: Roles.ROLE_TEACHER,
          createdAt: {
            $gte: startOfWeek,
            $lt: endOfWeek
          }
        })
        student = User.countDocuments({
          RoleID: Roles.ROLE_STUDENT,
          createdAt: {
            $gte: startOfWeek,
            $lt: endOfWeek
          }
        })
        result = await Promise.all([teacher, student])
        return response(
          getResultData(result[0], result[1]),
          false,
          "Lấy data thành công",
          200
        )
      case "Month":
        teacher = User.countDocuments({
          RoleID: Roles.ROLE_TEACHER,
          createdAt: {
            $gte: new Date(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-01`),
            $lt: new Date(`${currentDate.getFullYear()}-${currentDate.getMonth() + 2}-01`)
          }
        })
        student = User.countDocuments({
          RoleID: Roles.ROLE_STUDENT,
          createdAt: {
            $gte: new Date(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-01`),
            $lt: new Date(`${currentDate.getFullYear()}-${currentDate.getMonth() + 2}-01`)
          }
        })
        result = await Promise.all([teacher, student])
        return response(
          getResultData(result[0], result[1]),
          false,
          "Lấy data thành công",
          200
        )
      default:
        return response({}, true, "Key không tồn tại", 404)
    }
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const StatisticService = {
  fncStatisticTotalUser,
  fncStatisticNewRegisteredUser
}

export default StatisticService

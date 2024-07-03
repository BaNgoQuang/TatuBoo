
import LearnHistory from "../models/learnhistory.js"
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
    const queryDate = {
      $gte: FromDate,
      $lte: ToDate
    }
    const teacher = User.countDocuments({
      RoleID: Roles.ROLE_TEACHER,
      createdAt: queryDate
    })
    const student = User.countDocuments({
      RoleID: Roles.ROLE_STUDENT,
      createdAt: queryDate
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
    let teacher, student, result, queryDate
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
        queryDate = {
          $gte: startOfWeek,
          $lt: endOfWeek
        }
        teacher = User.countDocuments({
          RoleID: Roles.ROLE_TEACHER,
          createdAt: queryDate
        })
        student = User.countDocuments({
          RoleID: Roles.ROLE_STUDENT,
          createdAt: queryDate
        })
        result = await Promise.all([teacher, student])
        return response(
          getResultData(result[0], result[1]),
          false,
          "Lấy data thành công",
          200
        )
      case "Month":
        queryDate = {
          $gte: new Date(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-01`),
          $lt: new Date(`
            ${currentDate.getMonth() + 1 === 12 ? currentDate.getFullYear() + 1 : currentDate.getFullYear()}-
            ${currentDate.getMonth() + 1 === 12 ? "01" : currentDate.getMonth() + 2}-
            01`
          )
        }
        teacher = User.countDocuments({
          RoleID: Roles.ROLE_TEACHER,
          createdAt: queryDate
        })
        student = User.countDocuments({
          RoleID: Roles.ROLE_STUDENT,
          createdAt: queryDate
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

const fncStatisticBooking = async () => {
  try {
    let listBooking = []
    const currentDate = new Date()
    for (let i = 1; i <= 12; i++) {
      const totalBooking = LearnHistory.countDocuments({
        RegisterDate: {
          $gte: new Date(`${currentDate.getFullYear()}-${i}-01`),
          $lt: new Date(`
            ${i === 12 ? currentDate.getFullYear() + 1 : currentDate.getFullYear()}-
            ${i === 12 ? 1 : i + 1}-
            01`
          )
        }
      })
      listBooking.push(totalBooking)
    }
    const listTotal = await Promise.all(listBooking)
    const list = listTotal.map((i, idx) => ({
      Month: `Tháng ${idx + 1}`,
      Total: i
    }))
    return response(list, false, "Lấy data thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const StatisticService = {
  fncStatisticTotalUser,
  fncStatisticNewRegisteredUser,
  fncStatisticBooking
}

export default StatisticService

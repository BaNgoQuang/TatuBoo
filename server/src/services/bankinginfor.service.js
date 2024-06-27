import { response } from "../utils/lib.js"
import { getOneDocument } from "../utils/queryFunction.js"
import User from "../models/user.js"
import Payment from "../models/payment.js"
import Report from "../models/report.js"
import BankingInfor from "../models/bankinginfor.js"
import TimeTable from "../models/timetable.js"

const fncCreateBankingInfor = async (req) => {
  try {
    const newBankingInfor = await BankingInfor.create(req.body)
    return response(newBankingInfor, false, "Tạo thông tin banking thành công", 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetDetailBankingInfor = async (req) => {
  try {
    const UserID = req.user.ID
    const bankingInfor = await getOneDocument(BankingInfor, "User", UserID)
    if (!bankingInfor) return response({}, true, "Thông tin Banking không tồn tại", 200)
    return response(bankingInfor, false, "lấy ra thông tin thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetListBankingInfor = async (req) => {
  try {
    const { TextSearch, CurrentPage, PageSize } = req.body
    let query = {
      UserBankName: { $regex: TextSearch, $options: "i" },
      IsDeleted: false
    }
    const bankingInfor = BankingInfor
      .find(query)
      .skip((CurrentPage - 1) * PageSize)
      .limit(PageSize)
    const total = BankingInfor.countDocuments(query)
    const result = await Promise.all([bankingInfor, total])
    return response(
      { List: result[0], Total: result[1] },
      false,
      "Lấy ra thành công",
      200
    )
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncUpdateBankingInfor = async (req) => {
  try {
    const { BankingInforID, BankID, UserBankName, UserBankAccount } = req.body
    const updatedBankingInfor = await BankingInfor.findByIdAndUpdate(
      BankingInforID,
      {
        BankID: BankID,
        UserBankName: UserBankName,
        UserBankAccount: UserBankAccount,
      },
      { new: true, runValidators: true }
    )
    if (!updatedBankingInfor) return response({}, true, "Có lỗi xảy ra", 200)
    return response(updatedBankingInfor, false, "Cập nhật thông tin Banking thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncDeleteBankingInfor = async (req) => {
  try {
    const BankingInforID = req.param.BankingInforID
    const deleteBanking = await BankingInfor.findByIdAndDelete(BankingInforID)
    if (!deleteBanking) return response({}, true, "Có lỗi xảy ra", 200)
    return response({}, false, "Xóa thông tin banking thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetListPaymentInCurrentWeek = async (req) => {
  try {
    const today = new Date();

    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000);
    endOfWeek.setHours(23, 59, 59, 999);
    console.log(startOfWeek + endOfWeek)
    const { startDate, endDate } = req.body

    let query = {
      DateAt: { $gte: startOfWeek, $lte: endOfWeek },
    }
    if (startDate != null && endDate != null) {
      query = {
        DateAt: { $gte: startDate, $lte: endDate },
      }
    }
    const timeTable = TimeTable
      .find(query)
    const total = TimeTable.countDocuments(query)
    const result = await Promise.all([timeTable, total])

    const teacherCounts = {};
    result[0].forEach((timetable) => {
      teacherCounts[timetable.Teacher.toString()] = (teacherCounts[timetable.Teacher.toString()] || 0) + 1;
    });

    const reportData = [];
    for (const timetable of result[0]) {
      const reportInfor = await Report.findOne({ Timetable: timetable._id }).populate({ path: 'Timetable', select: 'Teacher' })
      reportData.push(reportInfor)
    }

    const teacherCountsReport = {};
    reportData.forEach((report) => {
      if (report != null) {
        teacherCountsReport[report.Timetable.Teacher.toString()] = (teacherCountsReport[report.Timetable.Teacher.toString()] || 0) + 1;
      }
    });

    const teacherData = [];
    for (const teacherId in teacherCounts) {
      const teacherBankingInfor = await BankingInfor.findOne({ User: teacherId })

      const teacherName = await User.findById(teacherId).then((user) => user.FullName);
      const teacherPrice = await User.findById(teacherId).then((user) => user.Price);
      const salary = (teacherPrice * teacherCounts[teacherId])
      const teacherPayment = await Payment.findOne({ Receiver: teacherId, PaymentTime: { $gte: startOfWeek, $lte: endOfWeek } })

      if (!teacherPayment) {
        let createPayment = await Payment.create({
          Sender: "664a5251b0563919ce2eba19",
          Receiver: teacherId,
          FeeType: 3,
          TraddingCode: Math.floor(Math.random() * 10000),
          TotalFee: salary,
          Description: "Thanh toán tiền dạy học cho giảng viên" + teacherName,
          PaymentStatus: 0,
        })
      }
      if (teacherPayment == null) teacherPayment = createPayment
      teacherData.push({
        teacherId: teacherId,
        teacherName,
        teachingSessions: teacherCounts[teacherId],
        teacherPrice,
        salary,
        teacherBankingInfor,
        teacherPayment,
        teacherReport: teacherCountsReport[teacherId] ? teacherCountsReport[teacherId] : 0,
      });
    }
    return response(
      { List: teacherData, Total: result[1] },
      false,
      "Lấy ra Report thành công",
      200
    );
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}


const BankingInforService = {
  fncCreateBankingInfor,
  fncGetDetailBankingInfor,
  fncUpdateBankingInfor,
  fncDeleteBankingInfor,
  fncGetListBankingInfor,
  fncGetListPaymentInCurrentWeek
}

export default BankingInforService

import { response } from "../utils/lib.js"
import { getOneDocument } from "../utils/queryFunction.js"
import BankingInfor from "../models/bankinginfor.js"
import Account from "../models/account.js"
import sendEmail from "../utils/send-mail.js"

const fncCreateBankingInfor = async (req) => {
  try {
    const UserID = req.user.ID
    const newBankingInfor = await BankingInfor.create({ ...req.body, User: UserID })
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
    const BankingInforID = req.params.BankingInforID
    const deleteBanking = await BankingInfor.findByIdAndDelete(BankingInforID)
    if (!deleteBanking) return response({}, true, "Có lỗi xảy ra", 200)
    return response({}, false, "Xóa thông tin banking thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetBankingInforOfUser = async (req) => {
  try {
    const { UserID, FullName, Email } = req.body
    const bankingInfor = await getOneDocument(BankingInfor, "User", UserID)
    if (!bankingInfor) {
      const subject = "THÔNG BÁO ĐIỀN THÔNG TIN NGÂN HÀNG"
      const content = `
                <html>
                <head>
                <style>
                    p {
                        color: #333;
                    }
                </style>
                </head>
                <body>
                  <p style="margin-top: 30px; margin-bottom:30px; text-align:center; font-weigth: 700; font-size: 20px">THÔNG BÁO ĐIỀN THÔNG TIN NGÂN HÀNG</p>
                  <p style="margin-bottom:10px">Xin chào ${FullName},</p>
                  <p style="margin-bottom:10px">Chúng tôi nhận thấy bạn chưa điền thông tin ngân hàng của mình. Hãy điền đầy đủ thông tin ngân hàng để chúng tôi có thể thanh toán tiền cho bạn.</p>
                </body>
                </html>
                `
      await sendEmail(Email, subject, content)
      return response({}, true, "Người dùng chưa điền thông tin ngân hàng", 200)
    }
    return response(bankingInfor, false, "lấy ra thông tin thành công", 200)
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
  fncGetBankingInforOfUser
}

export default BankingInforService

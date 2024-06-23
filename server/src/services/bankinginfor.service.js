import { response } from "../utils/lib.js"
import BankingInfor from "../models/bankinginfor.js"
import { getOneDocument } from "../utils/queryFunction.js"

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

const BankingInforService = {
  fncCreateBankingInfor,
  fncGetDetailBankingInfor,
  fncUpdateBankingInfor,
  fncDeleteBankingInfor
}

export default BankingInforService

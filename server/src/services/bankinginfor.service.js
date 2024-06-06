import { getOneDocument } from "../utils/commonFunction.js"
import { response } from "../utils/lib.js"
import BankingInfor from "../models/bankinginfor.js"

const fncCreateBankingInfor = async (req) => {
  try {
    const { UserID, BankID, BankName, BankShortName, UserBankName, UserBankAccount } = req.body
    const newBankingInfor = await BankingInfor.create({ UserID, BankID, BankName, BankShortName, UserBankName, UserBankAccount })
    return response(newBankingInfor, false, "Tạo thông tin banking thành công", 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetDetailBankingInfor = async (req) => {
  try {
    const UserID = req.param.UserID;
    const bankingInfor = await getOneDocument(BankingInfor, "UserID", UserID)
    if (!bankingInfor) return response({}, true, "Thông tin Banking không tồn tại", 200)
    return response(bankingInfor, true, " Thông tin banking không tồn tại", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncUpdateBankingInfor = async (req) => {
  try {
    const { BankingInforID, BankID, BankName, BankShortName, UserBankName, UserBankAccount } = req.body
    const checkExist = await getOneDocument(BankingInfor, "_id", BankingInforID)
    if (!checkExist) return response({}, true, "Thông tin Banking không tồn tại", 200)
    const updatedBankingInfor = await BankingInfor.findByIdAndUpdate(
      BankingInforID,
      {
        BankID: BankID,
        BankName: BankName,
        BankShortName: BankShortName,
        UserBankName: UserBankName,
        UserBankAccount: UserBankAccount,
      },
      { new: true, runValidators: true }
    )
    if (!updatedBankingInfor) return response({}, true, "Thông tin Banking không tồn tại", 200)
    return response(updatedBankingInfor, false, "Cập nhật thông tin Banking thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncDeleteBankingInfor = async (req) => {
  try {
    const BankingInforID = req.param.BankingInforID
    const deleteBankingInfor = await BankingInfor.findByIdAndDelete(BankingInforID)
    return response(deleteBankingInfor, false, "Xóa thông tin banking thành công", 200);
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

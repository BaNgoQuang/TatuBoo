import SystemKey from "../models/systemkey.js"
import checkPayment from "../tools/checkPayment.js"
import { response } from "../utils/lib.js"


const fncGetListSystemKey = async () => {
  try {
    const systemKeys = await SystemKey.find()
    // checkPayment()
    return response(systemKeys, false, "Lấy ra thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const SystemKeyService = {
  fncGetListSystemKey
}

export default SystemKeyService

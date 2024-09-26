import SystemKey from "../models/systemkey.js"
import checkPayment from "../tools/checkPayment.js"
import { response } from "../utils/lib.js"
import CacheService from "./cache.service.js"


const fncGetListSystemKey = async () => {
  try {
    let systemKeys
    const dataCache = CacheService.getCache("systemkey")
    if (!!dataCache) {
      systemKeys = dataCache
    } else {
      systemKeys = await SystemKey.find()
      CacheService.setCache("systemkey", systemKeys, 28800)
    }
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

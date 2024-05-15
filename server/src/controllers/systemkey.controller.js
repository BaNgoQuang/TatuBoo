import SystemKeyService from "../services/systemkey.service.js"


const getListSystemKey = async (req, res) => {
  try {
    const response = await SystemKeyService.fncGetListSystemKey(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const SystemKeyController = {
  getListSystemKey
}

export default SystemKeyController

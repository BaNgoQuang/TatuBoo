import MessageService from "../services/message.service.js"

const createMesseger = async (req, res) => {
  try {
    const response = await MessageService.fncCreateMesseger(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}


const getListMessengerFromSenderAndReceiver = async (req, res) => {
  try {
    const response = await MessageService.fncGetListMessengerFromSenderAndReceiver(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const deleteMesseger = async (req, res) => {
  try {
    const response = await MessageService.fncDeleteMesseger(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const updateMesseger = async (req, res) => {
  try {
    const response = await MessageService.fncUpdateMesseger(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const MessageController = {
  createMesseger,
  getListMessengerFromSenderAndReceiver,
  deleteMesseger,
  updateMesseger
}

export default MessageController

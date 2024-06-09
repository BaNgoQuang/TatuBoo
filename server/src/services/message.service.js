import { response } from "../utils/lib.js"
import Message from "../models/message.js"
import { getOneDocument } from "../utils/queryFunction.js"

const fncCreateMesseger = async (req) => {
  try {
    const newMesseger = await Message.create(req.body)
    return response(newMesseger, false, "Tạo Messenger thành công", 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetListMessengerFromSenderAndReceiver = async (req) => {
  try {
    const {SenderID, ReceiverID} = req.body

    const listMessenger = await Message.find({
      $or: [
        { SenderID: SenderID, ReceiverID: ReceiverID },
        { SenderID: ReceiverID, ReceiverID: SenderID }
      ]
    });
    return response(listMessenger, false, "Lấy list Messenger thành công", 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncDeleteMesseger = async (req) => {
  try {
    const { MessegerID } = req.param.MessegerID 
    const deletedMessenger = await Message.findByIdAndUpdate(
      MessegerID,
      { IsDeleted: true },
      { new: true }
    )
    if (!deletedMessenger) return response({}, true, "Messenger không tồn tại", 200)
    return response(deletedMessenger, false, "Xóa Messenger thành công", 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncUpdateMesseger = async (req) => {
  try {
    const { MessageID } = req.param.MessageID
    const { Content } = req.body
    const updateMesseger = await Message.findByIdAndUpdate(
      MessageID,
      {Content: Content}
    )
    if (!updateMesseger) return response({}, true, "Messenger không tồn tại", 200)
    return response(updateMesseger, false, "Update Messenger thành công", 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const MessageService = {
  fncCreateMesseger,
  fncGetListMessengerFromSenderAndReceiver,
  fncDeleteMesseger,
  fncUpdateMesseger,

}

export default MessageService

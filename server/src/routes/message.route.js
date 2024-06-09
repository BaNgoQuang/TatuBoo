import express from "express"
import MessageController from "../controllers/message.controller.js"

const MessageRoute = express.Router()

// Define model trên swagger
/**
 * @swagger
 * components:
 *  schemas:
 *    Messages:
 *      type: object
 *      required: 
 *        - SenderID
 *        - ReceiverID
 *        - Content
 *      properties:
 *        _id:
 *            type: ObjectId
 *        SenderID: 
 *            type: ObjectId
 *        ReceiverID: 
 *            type: ObjectId
 *        Content:
 *            type: string
 */

MessageRoute.post("/createMesseger",
  MessageController.createMesseger
)
MessageRoute.post("/getListMessengerFromSenderAndReceiver",
  MessageController.getListMessengerFromSenderAndReceiver
)

MessageRoute.get("/deleteMesseger/:MessegerID",
  MessageController.deleteMesseger
)

MessageRoute.post("/updateMesseger/:MessegerID",
  MessageController.updateMesseger
)

export default MessageRoute

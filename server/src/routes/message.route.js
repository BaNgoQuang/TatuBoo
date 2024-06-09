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
 *        - Sender
 *        - Receiver
 *        - Content
 *      properties:
 *        _id:
 *            type: ObjectId
 *        Sender: 
 *            type: ObjectId
 *        Receiver: 
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

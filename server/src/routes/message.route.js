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
 *      example:
 *        _id: 66417e33ba048389d5f4aa7f
 *        SenderID: 66417e33ba048389d5f4aa7f
 *        ReceiverID: 66417e33ba048389d5f4aa7f
 *        Content: asfbasfbasbf
 */

export default MessageRoute

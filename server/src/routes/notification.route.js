import express from "express"
import NotificationController from "../controllers/notification.controller.js"

const NotificationRoute = express.Router()

// Define model trên swagger
/**
 * @swagger
 * components:
 *  schemas:
 *    Notifications:
 *      type: object
 *      required: 
 *        - SenderID
 *        - ReceiverID
 *        - Content
 *        - IsSeen
 *      properties:
 *        _id:
 *            type: ObjectId
 *        SenderID: 
 *            type: ObjectId
 *        ReceiverID: 
 *            type: ObjectId
 *        Content:
 *            type: string
 *        IsSeen:
 *            type: Boolean
 */

export default NotificationRoute

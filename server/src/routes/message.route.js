import express from "express"
import MessageController from "../controllers/message.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js"
import { Roles } from "../utils/lib.js"

const MessageRoute = express.Router()

// Define model trên swagger
/**
 * @swagger
 * components:
 *  schemas:
 *    Messages:
 *      type: object
 *      required: 
 *        - Chat
 *        - Sender
 *        - Content
 *      properties:
 *        _id:
 *            type: ObjectId
 *        Sender: 
 *            type: ObjectId
 *        Chat: 
 *            type: ObjectId
 *        Content:
 *            type: string
 *        IsDeleted:
 *            type: boolean
 *        IsSeen:
 *            type: boolean
 */

/**
 * @swagger
 * /message/createMessage:
 *   post:
 *     tags: [Messages]
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *               Content: "string"
 *     responses:
 *       200:
 *         description: Thêm thành công
 *       500:
 *         description: Internal server error
 */
MessageRoute.post("/createMessage",
  authMiddleware([Roles.ROLE_STUDENT, Roles.ROLE_ADMIN, Roles.ROLE_STAFF, Roles.ROLE_TEACHER]),
  MessageController.createMessage
)

/**
 * @swagger
 * /message/getMessageByChat:
 *   post:
 *     tags: [Messages]
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *               ChatID: 664c1480b8f11adfc4f4a85b
 *               PageSize: 10
 *               CurrentPage: 1
 *     responses:
 *       200:
 *         description: Thêm thành công
 *       500:
 *         description: Internal server error
 */
MessageRoute.post("/getMessageByChat",
  authMiddleware([Roles.ROLE_STUDENT, Roles.ROLE_ADMIN, Roles.ROLE_STAFF, Roles.ROLE_TEACHER]),
  MessageController.getMessageByChat
)

/**
 * @swagger
 * /message/getChatWithUser:
 *   get:
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: Thêm thành công
 *       500:
 *         description: Internal server error
 */
MessageRoute.get("/getChatWithUser",
  authMiddleware([Roles.ROLE_STUDENT, Roles.ROLE_ADMIN, Roles.ROLE_STAFF, Roles.ROLE_TEACHER]),
  MessageController.getChatWithUser
)

/**
 * @swagger
 * /message/getChatOfAdmin:
 *   get:
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: Thêm thành công
 *       500:
 *         description: Internal server error
 */
MessageRoute.get("/getChatOfAdmin",
  authMiddleware([Roles.ROLE_ADMIN]),
  MessageController.getChatOfAdmin
)

/**
 * @swagger
 * /message/seenMessage/{ChatID}:
 *   get:
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: ChatID
 *         schema:
 *           type: ObjectId
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
MessageRoute.get("/seenMessage/:ChatID",
  authMiddleware([Roles.ROLE_STUDENT, Roles.ROLE_ADMIN, Roles.ROLE_STAFF, Roles.ROLE_TEACHER]),
  MessageController.seenMessage
)

export default MessageRoute

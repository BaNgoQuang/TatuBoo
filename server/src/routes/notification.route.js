import express from "express"
import NotificationController from "../controllers/notification.controller.js"
import authMiddleware from '../middlewares/auth.middleware.js'
import { Roles } from '../utils/lib.js'

const NotificationRoute = express.Router()

// Define model trên swagger
/**
 * @swagger
 * components:
 *  schemas:
 *    Notifications:
 *      type: object
 *      required: 
 *        - Sender
 *        - Content
 *        - Type
 *      properties:
 *        _id:
 *            type: ObjectId
 *        Sender: 
 *            type: ObjectId
 *        Content:
 *            type: string
 *        Type:
 *            type: string
 *        IsSeen: 
 *            type: boolean
 */

/**
 *  @swagger
 *  /notification/createNotification:
 *    post:
 *      tags: [Notifications]
 *      requestBody:
 *        content:
 *          application/json:
 *              example:
 *                Sender: 664c1480b8f11adfc4f4a85b
 *                Content: "string" 
 *                Type: "string"
 *      responses:
 *        200:
 *          description: Thêm thông báo
 *        500:
 *           description: internal server error
 */
NotificationRoute.post('/createNotification',
  authMiddleware([Roles.ROLE_STAFF, Roles.ROLE_STUDENT, Roles.ROLE_TEACHER, Roles.ROLE_ADMIN]),
  NotificationController.createNotification
)

/**
 * @swagger
 * /notification/seenNotification:
 *   get:
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: Seen thông báo
 *       500:
 *        description: Internal server error
 */
NotificationRoute.get('/seenNotification',
  authMiddleware([Roles.ROLE_ADMIN]),
  NotificationController.seenNotification
)

/**
 * @swagger
 * /notification/getListNotification:
 *   get:
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: Seen thông báo
 *       500:
 *        description: Internal server error
 */
NotificationRoute.get('/getListNotification',
  authMiddleware([Roles.ROLE_ADMIN]),
  NotificationController.getListNotification
)

export default NotificationRoute

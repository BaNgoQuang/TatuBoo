import express from "express"
import PaymentController from "../controllers/payment.controller.js"
import authMiddleware from '../middlewares/auth.middleware.js'
import { Roles } from "../utils/lib.js"

const PaymentRoute = express.Router()

// Define model trên swagger
/**
 * @swagger
 * components:
 *  schemas:
 *    Payments:
 *      type: object
 *      required: 
 *        - SenderID
 *        - FeeType
 *        - TraddingCode
 *        - TotalFee
 *        - Description
 *      properties:
 *        _id:
 *            type: ObjectId
 *        SenderID: 
 *            type: ObjectId
 *        FeeType: 
 *            type: Number
 *        TraddingCode:
 *            type: string
 *        TotalFee:
 *            type: string
 *        Description:
 *            type: string
 *        PaymentTime:
 *            type: Date
 */

/**
 * @swagger
 * /payment/createPaymentLink:
 *   post:
 *     tags: [Payments]
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *               TotalFee: 1
 *               Description: "string"
 *               ReturnURL: "string"
 *               CancelURL: "string"
 *     responses:
 *       200:
 *         description: Tạo link thành công
 *       500:
 *         description: Internal server error
 */
PaymentRoute.post("/createPaymentLink",
  authMiddleware([Roles.ROLE_STUDENT, Roles.ROLE_ADMIN, Roles.ROLE_STAFF, Roles.ROLE_TEACHER]),
  PaymentController.createPaymentLink
)

/**
 * @swagger
 * /payment/createPayment:
 *   post:
 *     tags: [Payments]
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *               FeeType: 1
 *               Description: "string"
 *     responses:
 *       200:
 *         description: Thêm thành công
 *       500:
 *         description: Internal server error
 */
PaymentRoute.post("/createPayment",
  authMiddleware([Roles.ROLE_STUDENT, Roles.ROLE_ADMIN, Roles.ROLE_STAFF, Roles.ROLE_TEACHER]),
  PaymentController.createPayment
)

/**
 * @swagger
 * /payment/getListPaymentHistoryByUser:
 *   post:
 *     tags: [Payments]
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *               PageSize: 10
 *               CurrentPage: 1
 *     responses:
 *       200:
 *         description: Thêm thành công
 *       500:
 *         description: Internal server error
 */
PaymentRoute.post("/getListPaymentHistoryByUser",
  authMiddleware([Roles.ROLE_STUDENT, Roles.ROLE_ADMIN, Roles.ROLE_STAFF, Roles.ROLE_TEACHER]),
  PaymentController.getListPaymentHistoryByUser
)

export default PaymentRoute

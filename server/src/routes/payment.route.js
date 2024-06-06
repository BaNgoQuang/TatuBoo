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
 *        - UserID
 *        - FeeType
 *        - Description
 *        - PaymentTime
 *      properties:
 *        _id:
 *            type: ObjectId
 *        UserID: 
 *            type: ObjectId
 *        FeeType: 
 *            type: Number
 *        Description:
 *            type: string
 *        PaymentTime:
 *            type: Date
 */

/**
 * @swagger
 * /payment/createPaymentLink:
 *   post:
 *     summary: Lấy link payment 
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
 *     summary: Thêm thanh toán
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
 *     summary: Lấy ra danh sách thanh toán
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

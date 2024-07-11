import express from "express"
import PaymentController from "../controllers/payment.controller.js"
import authMiddleware from '../middlewares/auth.middleware.js'
import { Roles } from "../utils/lib.js"
import PaymentValidation from "../validations/payment.validation.js"

const PaymentRoute = express.Router()

// Define model trên swagger
/**
 * @swagger
 * components:
 *  schemas:
 *    Payments:
 *      type: object
 *      required: 
 *        - Sender
 *        - PaymentType
 *        - TraddingCode
 *        - TotalFee
 *        - Description
 *      properties:
 *        _id:
 *            type: ObjectId
 *        Sender: 
 *            type: ObjectId
 *        Receiver: 
 *            type: ObjectId
 *        PaymentType: 
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
 * /payment/createPayment:
 *   post:
 *     tags: [Payments]
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *               PaymentType: 1
 *               Description: "string"
 *     responses:
 *       200:
 *         description: Thêm thành công
 *       500:
 *         description: Internal server error
 */
PaymentRoute.post("/createPayment",
  authMiddleware([Roles.ROLE_STUDENT, Roles.ROLE_ADMIN, Roles.ROLE_STAFF, Roles.ROLE_TEACHER]),
  PaymentValidation.createPayment,
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
 *               TraddingCode: "12345"
 *               PaymentStatus: 1 
 *     responses:
 *       200:
 *         description: Thêm thành công
 *       500:
 *         description: Internal server error
 */
PaymentRoute.post("/getListPaymentHistoryByUser",
  authMiddleware([Roles.ROLE_STUDENT, Roles.ROLE_ADMIN, Roles.ROLE_STAFF, Roles.ROLE_TEACHER]),
  PaymentValidation.getListPaymentHistoryByUser,
  PaymentController.getListPaymentHistoryByUser
)

/**
 * @swagger
 * /payment/changePaymentStatus:
 *   post:
 *     tags: [Payments]
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *               PaymentID: 664c1480b8f11adfc4f4a85b
 *               PaymentStatus: 1
 *     responses:
 *       200:
 *         description: Thêm thành công
 *       500:
 *         description: Internal server error
 */
PaymentRoute.post("/changePaymentStatus",
  authMiddleware([Roles.ROLE_STUDENT, Roles.ROLE_ADMIN, Roles.ROLE_STAFF, Roles.ROLE_TEACHER]),
  PaymentValidation.changePaymentStatus,
  PaymentController.changePaymentStatus
)

/**
 * @swagger
 * /payment/getListPayment:
 *   post:
 *     tags: [Payments]
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *               PageSize: 10
 *               CurrentPage: 1
 *               TextSearch: "string"
 *               PaymentStatus: 1
 *               PaymentType: 1
 *     responses:
 *       200:
 *         description: Thêm thành công
 *       500:
 *         description: Internal server error
 */
PaymentRoute.post("/getListPayment",
  authMiddleware([Roles.ROLE_ADMIN]),
  PaymentValidation.getListPayment,
  PaymentController.getListPayment
)

/**
 * @swagger
 * /payment/exportExcel:
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
PaymentRoute.get("/exportExcel",
  authMiddleware([Roles.ROLE_ADMIN]),
  PaymentController.exportExcel
)

export default PaymentRoute

import express from "express"
import PaymentHistoryController from "../controllers/paymenthistory.controller.js"

const PaymentHistoryRoute = express.Router()

// Define model trên swagger
/**
 * @swagger
 * components:
 *  schemas:
 *    PaymentHistory:
 *      type: object
 *      required: 
 *        - UserID
 *        - FeeType
 *        - PaymentInfor
 *        - PaymentTime
 *      properties:
 *        _id:
 *            type: ObjectId
 *        UserID: 
 *            type: ObjectId
 *        FeeType: 
 *            type: Number
 *        PaymentInfor:
 *            type: string
 *        PaymentTime:
 *            type: Date
 */

export default PaymentHistoryRoute

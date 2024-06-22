import express from "express"
import BankingInforController from "../controllers/bankinginfor.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js"
import { Roles } from "../utils/lib.js"

const BankingInforRoute = express.Router()

// Define model trên swagger
/**
 * @swagger
 * components:
 *  schemas:
 *    BankingInfors:
 *      type: object
 *      required: 
 *        - UserID
 *        - BankID
 *        - BankName
 *        - BankShortName
 *        - UserBankName
 *        - UserBankAccount
 *      properties:
 *        _id:
 *            type: ObjectId
 *        UserID: 
 *            type: ObjectId
 *        BankID: 
 *            type: Number
 *        UserBankName:
 *            type: string
 *        UserBankAccount:
 *            type: Number
 */


/**
 * @swagger
 * /bankinginfor/createBankingInfor:
 *   post:
 *     tags: [BankingInfors]
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *               UserID: "Music"
 *               BankID: "ABC"
 *               UserBankName: "NGUYEN TAI DUC"
 *               UserBankAccount: 0339089089
 *     responses:
 *       201:
 *         description: Subject category created successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server error
 */
BankingInforRoute.post("/createBankingInfor",
  authMiddleware([Roles.ROLE_STUDENT, Roles.ROLE_TEACHER]),
  BankingInforController.createBankingInfor
)

BankingInforRoute.get("/getDetailBankingInfor",
  authMiddleware([Roles.ROLE_STUDENT, Roles.ROLE_TEACHER]),
  BankingInforController.getDetailBankingInfor
)

BankingInforRoute.get("/deleteBankingInfor/:BankingInforID",
  authMiddleware([Roles.ROLE_STUDENT, Roles.ROLE_TEACHER]),
  BankingInforController.deleteBankingInfor
)

BankingInforRoute.post("/updateBankingInfor",
  authMiddleware([Roles.ROLE_STUDENT, Roles.ROLE_TEACHER]),
  BankingInforController.updateBankingInfor
)

export default BankingInforRoute

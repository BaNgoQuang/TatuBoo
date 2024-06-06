import express from "express"
import BankingInforController from "../controllers/bankinginfor.controller.js"
import BankingInfor from "../models/bankinginfor.js"

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
 *        - OrganizationID
 *        - BankID
 *        - BankNumber
 *      properties:
 *        _id:
 *            type: ObjectId
 *        UserID: 
 *            type: ObjectId
 *        OrganizationID: 
 *            type: ObjectId
 *        BankID:
 *            type: Number
 *        BankNumber:
 *            type: string
 */

BankingInforRoute.post("/createBankingInfor",
  BankingInforController.createBankingInfor
)

BankingInforRoute.get("/getDetailBankingInfor/:UserID",
  BankingInforController.getDetailBankingInfor
)

BankingInforRoute.get("/deleteBankingInfor/:BankingInforID",
  BankingInforController.deleteBankingInfor
)

BankingInforRoute.post("/updateBankingInfor",
  BankingInforController.updateBankingInfor
)

export default BankingInforRoute

import express from "express"
import BankingInforController from "../controllers/bankinginfor.controller.js"

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

export default BankingInforRoute

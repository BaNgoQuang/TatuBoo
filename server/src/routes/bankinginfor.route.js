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
 *    BankingInfor:
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
 *     tags: [BankingInfor]
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *               User: "664c1480b8f11adfc4f4a85b"
 *               BankID: 12
 *               UserBankName: "PHAM MINH TUAN"
 *               UserBankAccount: 0123456789
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

/**
 * @swagger
 * /bankinginfor/getDetailBankingInfor:
 *   get:
 *     tags: [BankingInfor]
 *     responses:
 *       200:
 *         description: Thông tin banking tồn tại
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
BankingInforRoute.get("/getDetailBankingInfor",
  authMiddleware([Roles.ROLE_STUDENT, Roles.ROLE_TEACHER]),
  BankingInforController.getDetailBankingInfor
)

/**
 * @swagger
 * /bankinginfor/deleteBankingInfor/{BankingInforID}:
 *   get:
 *     tags: [BankingInfor]
 *     parameters:
 *       - in: path
 *         name: BankingInforID
 *         schema:
 *           type: ObjectId
 *     responses:
 *       200:
 *         description: Xóa thông tin banking thành công
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
BankingInforRoute.get("/deleteBankingInfor/:BankingInforID",
  authMiddleware([Roles.ROLE_STUDENT, Roles.ROLE_TEACHER]),
  BankingInforController.deleteBankingInfor
)

/**
 * @swagger
 * /bankinginfor/updateBankingInfor:
 *   post:
 *     tags: [BankingInfor]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *                BankingInforID:
 *                  type: ObjectId
 *                BankID:
 *                  type: number
 *                UserBankName: 
 *                  type: string
 *                UserBankAccount:
 *                  type: number
 *     responses:
 *       200:
 *         description: Cập nhật thông tin Banking thành công
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal server error
 */
BankingInforRoute.post("/updateBankingInfor",
  authMiddleware([Roles.ROLE_STUDENT, Roles.ROLE_TEACHER]),
  BankingInforController.updateBankingInfor
)

export default BankingInforRoute

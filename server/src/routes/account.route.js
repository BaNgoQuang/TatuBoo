import express from "express"
import AccountController from "../controllers/account.controller.js"

const AccountRoute = express.Router()

// Define model trên swagger
/**
 * @swagger
 * components:
 *  schemas:
 *    Accounts:
 *      type: object
 *      required: 
 *        - UserID
 *        - OrganizationID
 *        - Email
 *        - IsByGoogle
 *      properties:
 *        _id:
 *            type: ObjectId
 *        UserID: 
 *            type: ObjectId
 *        OrganizationID: 
 *            type: ObjectId
 *        Email:
 *            type: string
 *        Password:
 *            type: string
 *        IsByGoogle:
 *            type: boolean
 *      example:
 *        Email: abc@gmail.com
 *        Password: "12344566"
 *        RoleID: 1
 *        IsByGoogle: true
 */

/**
 *  @swagger
 *  /account/register:
 *    post:
 *      summary: Đăng ký tài khoản
 *      tags: [Accounts]
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Accounts'
 *      responses:
 *        200:
 *          description: Tài khoản đăng ký thành công
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Accounts'
 *        500:
 *           description: Internal server error
 */
AccountRoute.post("/register",
  AccountController.register
)

export default AccountRoute

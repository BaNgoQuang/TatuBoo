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
 *              example:
 *                FullName: Nguyen Van An
 *                Email: abc@gmail.com
 *                Password: "12344566"
 *                RoleID: 1
 *      responses:
 *        200:
 *          description: tài khoản đăng ký thành công
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Accounts'
 *        500:
 *           description: internal server error
 */
AccountRoute.post("/register",
  AccountController.register
)
/**
 *  @swagger
 *  /account/registerByGoogle:
 *    post:
 *      summary: Đăng ký tài khoản với google
 *      tags: [Accounts]
 *      requestBody:
 *        content:
 *          application/json:
 *            example:
 *                given_name: Nguyen Van An
 *                email: abc@gmail.com
 *                picture: "abc.jpg"
 *                RoleID: 1
 *      responses:
 *        200:
 *          description: tài khoản đăng ký thành công
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Accounts'
 *        500:
 *           description: internal server error
 */
AccountRoute.post("/registerByGoogle",
  AccountController.registerByGoogle
)
/**
 *  @swagger
 *  /account/login:
 *    post:
 *      summary: Đăng nhập
 *      tags: [Accounts]
 *      requestBody:
 *        content:
 *          application/json:
 *              example:
 *                Email: abc@gmail.com
 *                Password: "12345"
 *      responses:
 *        200:
 *          description: đăng nhập thành công
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Accounts'
 *        500:
 *           description: internal server error
 */
AccountRoute.post("/login",
  AccountController.login
)
/**
 *  @swagger
 *  /account/loginByGoogle:
 *    post:
 *      summary: Đăng nhập
 *      tags: [Accounts]
 *      requestBody:
 *        content:
 *          application/json:
 *              example:
 *                email: abc@gmail.com
 *      responses:
 *        200:
 *          description: đăng nhập thành công
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Accounts'
 *        500:
 *           description: internal server error
 */
AccountRoute.post("loginByGoogle",
  AccountController.loginByGoogle
)

export default AccountRoute

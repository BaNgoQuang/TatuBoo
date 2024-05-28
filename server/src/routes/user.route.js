import express from "express"
import UserController from "../controllers/user.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js"
import upload from '../middlewares/clouddinary.middleware.js'
import { Roles } from "../utils/lib.js"

const UserRoute = express.Router()

// Define model trên swagger
/**
 * @swagger
 * components:
 *  schemas:
 *    Users:
 *      type: object
 *      required: 
 *        - FullName
 *        - Phone
 *        - RoleID
 *      properties:
 *        _id:
 *            type: ObjectId
 *        OrganizationID: 
 *            type: ObjectId
 *        FullName: 
 *            type: string
 *        Phone:
 *            type: string
 *        AvatarPath: 
 *            type: string
 *        RoleID:
 *            type: number
 *        Subject: 
 *            type: array
 *            items: 
 *              type: ObjectId
 *        Quotes: 
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                  SubjectID:
 *                    type: ObjectId
 *                  Title: 
 *                    type: string
 *                  Content: 
 *                    type: string  
 *        Description: 
 *              type: string     
 *        Experiences: 
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                  Title: 
 *                    type: string
 *                  Content: 
 *                    type: string     
 *        IntroductVideos: 
 *            type: array
 *            items: 
 *              type: object
 *              properties:
 *                 Title: 
 *                   type: string
 *                 VideoPath: 
 *                   type: string     
 *        Votes: 
 *          type: array
 *          items:
 *            type: number
 *        IsByGoogle: 
 *          type: Boolean
 *        IsCompleteRegister: 
 *          type: Boolean
 *        IsFirstLogin: 
 *          type: Boolean
 *        BlogFollow:
 *          type: array
 *          items:
 *            type: ObjectIdWWW
 */

/**
 * @swagger
 * /user/getDetailProfile:
 *   get:
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Get thành công
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Users'
 *       500:
 *        description: Internal server error
 */
UserRoute.get("/getDetailProfile",
  authMiddleware([Roles.ROLE_ADMIN, Roles.ROLE_STAFF, Roles.ROLE_STUDENT, Roles.ROLE_TEACHER]),
  UserController.getDetailProfile
)

/**
 * @swagger
 * /user/changeProfile:
 *   post:
 *     tags: [Users]
 *     requestBody:
 *        content:
 *          application/json:
 *              example:
 *                Email: abc@gmail.com
 *                Password: "12345"
 *     responses:
 *       200:
 *         description: Sửa thành công
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Users'
 *       500:
 *        description: Internal server error
 */
UserRoute.post("/changeProfile",
  upload("Avatar").single("Avatar"),
  authMiddleware([Roles.ROLE_TEACHER]),
  UserController.changeProfile
)

/**
 * @swagger
 * /user/requestConfirmRegister:
 *   get:
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Gửi thành công
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Users'
 *       500:
 *        description: Internal server error
 */
UserRoute.get("/requestConfirmRegister",
  authMiddleware([Roles.ROLE_TEACHER]),
  UserController.requestConfirmRegister
)

/**
 *  @swagger
 *  /user/responseConfirmRegister:
 *    post:
 *      tags: [Users]
 *      requestBody:
 *        content:
 *          application/json:
 *              example:
 *                TeacherID: 664c1480b8f11adfc4f4a85b
 *                RegisterStatus: 1
 *                FullName: "Nguyen Van An"
 *      responses:
 *        200:
 *          description: Phản hồi thành công
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Users'
 *        500:
 *           description: internal server error
 */
UserRoute.post("/responseConfirmRegister",
  authMiddleware([Roles.ROLE_ADMIN, Roles.ROLE_STAFF]),
  UserController.responseConfirmRegister
)

/**
 * @swagger
 * /user/pushSubjectForTeacher/{SubjectID}:
 *   get:
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: SubjectID
 *         schema:
 *           type: ObjectId
 *         description: ID của môn học
 *     responses:
 *       200:
 *         description: Thêm môn học thành công
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Users'
 *       500:
 *        description: Internal server error
 */
UserRoute.get("/pushSubjectForTeacher/:SubjectID",
  authMiddleware([Roles.ROLE_TEACHER]),
  UserController.pushSubjectForTeacher
)

/**
 *  @swagger
 *  /user/getListTeacher:
 *    post:
 *      tags: [Users]
 *      requestBody:
 *        content:
 *          application/json:
 *              example:
 *                TextSearch: "string"
 *                SubjectCateID: 664c1480b8f11adfc4f4a85b
 *                CurrentPage: 1 
 *                PageSize: 10
 *                Level: [1,2,3]
 *                FromPrice: "0"
 *                ToPrice: "200"
 *                RegisterStatus: 1
 *      responses:
 *        200:
 *          description: Phản hồi thành công
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Users'
 *        500:
 *           description: internal server error
 */
UserRoute.post("/getListTeacher",
  UserController.getListTeacher
)

export default UserRoute

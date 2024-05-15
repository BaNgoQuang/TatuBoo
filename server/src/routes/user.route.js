import express from "express"
import UserController from "../controllers/user.controller.js"

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

export default UserRoute

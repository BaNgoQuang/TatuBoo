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
 *        VideoPaths: 
 *            type: array
 *            items: 
 *              type: string     
 *        Votes: 
 *          type: array
 *          items:
 *            type: number
 *      example:
 *         _id: 66417e33ba048389d5f4aa7f
 *         OrganizationID: 66417e33ba048389d5f4aa7f
 *         TeacherID: 66417e33ba048389d5f4aa7f
 *         CourseName: Sample Course
 *         Price: 100
 *         Levels: [1, 2, 3]
 *         Description:
 *           - Title: Introduction
 *             Content: This is an introductory course.
 *           - Title: Advanced
 *             Content: This is an advanced course.
 *         Votes: [5, 4, 3]
 */

export default UserRoute

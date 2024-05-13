import express from "express"
import CourseController from "../controllers/course.controller.js"

const CourseRoute = express.Router()

// Define model trên swagger
/**
 * @swagger
 * components:
 *  schemas:
 *    Courses:
 *      type: object
 *      required: 
 *        - OrganizationID
 *        - TeacherID
 *        - CourseName
 *        - Levels
 *        - Description
 *      properties:
 *        _id:
 *            type: ObjectId
 *        OrganizationID: 
 *            type: ObjectId
 *        TeacherID: 
 *            type: ObjectId
 *        CourseName:
 *            type: string
 *        Levels: 
 *            type: array
 *            items: 
 *              type: number
 *        Description: 
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                  Title: 
 *                    type: string
 *                  Content: 
 *                    type: string                
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

export default CourseRoute

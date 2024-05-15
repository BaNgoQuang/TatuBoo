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
 */

export default CourseRoute

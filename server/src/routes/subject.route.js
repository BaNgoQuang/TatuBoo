import express from "express"
import SubjectController from "../controllers/subject.controller.js"

const SubjectRoute = express.Router()

// Define model trên swagger
/**
 * @swagger
 * components:
 *  schemas:
 *    Subjects:
 *      type: object
 *      required: 
 *        - CourseID
 *        - SubjectName
 *      properties:
 *        _id:
 *            type: ObjectId
 *        CourseID: 
 *            type: ObjectId
 *        SubjectName:
 *            type: string
 */

export default SubjectRoute

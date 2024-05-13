import express from "express"
import SubjectCateController from "../controllers/subjectcate.controller.js"

const SubjectCateRoute = express.Router()

// Define model trên swagger
/**
 * @swagger
 * components:
 *  schemas:
 *    SubjectCates:
 *      type: object
 *      required: 
 *        - SubjectCateName
 *        - Description
 *      properties:
 *        _id:
 *            type: ObjectId
 *        SubjectCateName: 
 *            type: string
 *        Description: 
 *            type: string
 *      example:
 *        _id: 66417e33ba048389d5f4aa7f
 *        SubjectCateName: abadsfbasdb
 *        Description: sfbasdbasdbasba
 */

export default SubjectCateRoute

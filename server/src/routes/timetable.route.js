import express from "express"
import TimeTableController from "../controllers/timetable.controller.js"
import authMiddleware from '../middlewares/auth.middleware.js'
import { Roles } from "../utils/lib.js"

const TimeTableRoute = express.Router()

// Define model trên swagger
/**
 * @swagger
 * components:
 *  schemas:
 *    TimeTables:
 *      type: object
 *      required: 
 *        - TeacherID
 *        - StudentID
 *        - SubjectID
 *        - DateAt
 *        - StartTime
 *        - EndTime
 *        - LearnType
 *      properties:
 *        _id:
 *            type: ObjectId
 *        TeacherID: 
 *            type: ObjectId
 *        StudentID: 
 *            type: ObjectId
 *        SubjectID: 
 *            type: ObjectId
 *        DateAt:
 *            type: date
 *        StartTime:
 *            type: date
 *        EndTime:
 *            type: date
 *        LearnType: 
 *            type: number
 *        Address:
 *            type: string  
 *        Status:
 *            type: boolean
 *        IsDeleted:
 *            type: boolean
 */

/**
 * @swagger
 * /timetable/createTimeTable:
 *   post:
 *     summary: Thêm thanh toán
 *     tags: [TimeTables]
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *              -  TeacherID: 664c1480b8f11adfc4f4a85b
 *                 SubjectID: 664c1480b8f11adfc4f4a85b
 *                 DateAt: 2024-05-21T03:26:56.488+00:00
 *                 StartTime: 2024-05-21T03:26:56.488+00:00
 *                 EndTime: 2024-05-21T03:26:56.488+00:00
 *                 LearnType: 1
 *                 Address: "string"
 *     responses:
 *       200:
 *         description: Thêm thành công
 *       500:
 *         description: Internal server error
 */
TimeTableRoute.post("/createTimeTable",
  authMiddleware([Roles.ROLE_STUDENT]),
  TimeTableController.createTimeTable
)

/**
 * @swagger
 * /timetable/getTimeTableByUser:
 *   get:
 *     summary: Get timetable by user
 *     tags: [TimeTables]
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
TimeTableRoute.get("/getTimeTableByUser",
  authMiddleware([Roles.ROLE_STUDENT, Roles.ROLE_TEACHER]),
  TimeTableController.getTimeTableByUser
)

export default TimeTableRoute

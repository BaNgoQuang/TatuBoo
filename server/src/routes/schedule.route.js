import express from "express"
import ScheduleController from "../controllers/schedule.controller.js"

const ScheduleRoute = express.Router()

// Define model trên swagger
/**
 * @swagger
 * components:
 *  schemas:
 *    Schedules:
 *      type: object
 *      required: 
 *        - TeacherID
 *        - StudentID
 *        - StartTime
 *        - EndTime
 *        - Address
 *      properties:
 *        _id:
 *            type: ObjectId
 *        TeacherID: 
 *            type: ObjectId
 *        StudentID: 
 *            type: ObjectId
 *        StartTime:
 *            type: date
 *        EndTime:
 *            type: date
 *        Address:
 *            type: string
 *        Votes:
 *            type: array
 *            items:
 *              type: number
 *      example:
 *        _id: 66417e33ba048389d5f4aa7f
 *        TeacherID: 66417e33ba048389d5f4aa7f
 *        StudentID: 66417e33ba048389d5f4aa7f
 *        StartTime: 2024-05-01T16:50:35.944+00:00
 *        EndTime: 2024-05-01T16:50:35.944+00:00
 *        Address: Thai Binh
 *        
 */

export default ScheduleRoute

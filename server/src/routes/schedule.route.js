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
 */

export default ScheduleRoute

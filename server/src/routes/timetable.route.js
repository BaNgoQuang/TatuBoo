import express from "express"
import TimeTableController from "../controllers/timetable.controller.js"

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

export default TimeTableRoute

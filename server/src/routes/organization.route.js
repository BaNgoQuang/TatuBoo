import express from "express"
import OrganizationController from "../controllers/organization.controller.js"

const OrganizationRoute = express.Router()

// Define model trên swagger
/**
 * @swagger
 * components:
 *  schemas:
 *    Organizations:
 *      type: object
 *      required: 
 *        - OrganizationName
 *        - Address
 *        - Phone
 *      properties:
 *        _id:
 *            type: ObjectId
 *        OrganizationName:
 *            type: string
 *        Address: 
 *            type: string
 *        Phone: 
 *            type: string
 *      example:
 *        _id: 66417e33ba048389d5f4aa7f
 *        OrganizationName: TopCV
 *        Address: Ha noi
 *        Phone: 091234156
 */

export default OrganizationRoute

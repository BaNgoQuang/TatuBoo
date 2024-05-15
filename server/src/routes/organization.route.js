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
 */

export default OrganizationRoute

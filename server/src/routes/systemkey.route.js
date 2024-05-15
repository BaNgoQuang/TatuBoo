import express from "express"
import SystemKeyController from "../controllers/systemkey.controller.js"

const SystemKeyRoute = express.Router()

// Define model trên swagger
/**
 * @swagger
 * components:
 *  schemas:
 *    SystemKeys:
 *      type: object
 *      required: 
 *        - KeyID
 *        - KeyName
 *      properties:
 *        _id:
 *            type: ObjectId
 *        KeyID: 
 *            type: number
 *        KeyName: 
 *            type: string
 *        Parents: 
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                ParentID:
 *                  type: number
 *                ParentName:
 *                  type: string
 */

export default SystemKeyRoute

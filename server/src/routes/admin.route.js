import express from "express"
import AdminController from "../controllers/admin.controller.js"

const AdminRoute = express.Router()

// Define model trên swagger
/**
 * @swagger
 * components:
 *  schemas:
 *    Accounts:
 *      type: object
 *      required: 
 *        - FullName
 *        - AvatarPath
 *        - RoleID
 *      properties:
 *        _id:
 *            type: ObjectId
 *        UserID: 
 *            type: ObjectId
 *        FullName: 
 *            type: string
 *        AvatarPath:
 *            type: string
 *        RoleID:
 *            type: Number
 */

export default AdminRoute

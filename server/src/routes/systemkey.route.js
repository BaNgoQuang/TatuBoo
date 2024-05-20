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

/**
 * @swagger
 * /systemkey/getListSystemkey:
 *   get:
 *     summary: Danh sách các trạng thái có trong hệ thống
 *     tags: [SystemKeys]
 *     responses:
 *       200:
 *         description: Lấy ra danh sách thành công
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/SystemKeys'
 *       500:
 *        description: Internal server error
 */
SystemKeyRoute.get("/getListSystemkey",
  SystemKeyController.getListSystemKey
)

export default SystemKeyRoute

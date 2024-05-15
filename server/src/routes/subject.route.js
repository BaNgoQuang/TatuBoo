import express from "express"
import SubjectController from "../controllers/subject.controller.js"

const SubjectRoute = express.Router()

// Define model trên swagger
/**
 * @swagger
 * components:
 *  schemas:
 *    Subjects:
 *      type: object
 *      required: 
 *        - SubjectCateID
 *        - SubjectName
 *      properties:
 *        _id:
 *            type: ObjectId
 *        SubjectCateID: 
 *            type: ObjectId
 *        SubjectName:
 *            type: string
 */

/**
 * @swagger
 * /subject/createSubject:
 *   post:
 *     summary: Create a new subject
 *     tags: [Subjects]
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *                SubjectCateID: 6644feb9edc726e843a63528
 *                SubjectName: Sáo
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal server error
 */
SubjectRoute.post("/createSubject",
  SubjectController.createSubject
)

/**
 * @swagger
 * /subject/getListSubject:
 *   post:
 *     summary: Lấy ra danh sách Subject
 *     tags: [Subjects]
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *               TextSearch: "string"
 *               CurrentPage: 0 
 *               PageSize: 0
 *     responses:
 *       200:
 *         description: Lấy ra thành công
 *       500:
 *         description: Internal server error
 */
SubjectRoute.post("/getListSubject",
  SubjectController.getListSubject
)

export default SubjectRoute

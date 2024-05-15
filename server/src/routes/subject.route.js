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
 *      example:
 *        _id: 66417e33ba048389d5f4aa7f
 *        SubjectCateID: 66417e33ba048389d5f4aa7f
 *        Content: asfbasfbasbf
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
 *           schema:
 *             type: object
 *             required:
 *               - SubjectCateID
 *               - SubjectName
 *             properties:
 *               SubjectCateID:
 *                 type: string
 *                 description: The ID of the SubjectCate
 *               SubjectName:
 *                 type: string
 *                 description: The name of the subject
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
 *           schema:
 *             type: object
 *             required:
 *               - TextSearch
 *               - CurrentPage
 *               - PageSize
 *             properties:
 *               TextSearch:
 *                 type: string
 *               CurrentPage:
 *                 type: integer 
 *               PageSize:
 *                type: integer
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

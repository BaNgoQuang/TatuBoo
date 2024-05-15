import express from "express"
import SubjectCateController from "../controllers/subjectcate.controller.js"

const SubjectCateRoute = express.Router()

// Define model trên swagger
/**
 * @swagger
 * components:
 *  schemas:
 *    SubjectCates:
 *      type: object
 *      required: 
 *        - SubjectCateName
 *        - Description
 *      properties:
 *        _id:
 *            type: ObjectId
 *        SubjectCateName: 
 *            type: string
 *        Description: 
 *            type: string
 *      example:
 *        _id: 66417e33ba048389d5f4aa7f
 *        SubjectCateName: abadsfbasdb
 *        Description: sfbasdbasdbasba
 */

/**
 * @swagger
 * /subjectcate/createSubjectCate:
 *   post:
 *     summary: Create a new subject category
 *     tags: [SubjectCates]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - SubjectCateName
 *               - Description
 *             properties:
 *               SubjectCateName:
 *                 type: string
 *                 description: The name of the subject category
 *               Description:
 *                 type: string
 *                 description: The description of the subject category
 *     responses:
 *       201:
 *         description: Subject category created successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server error
 */
SubjectCateRoute.post("/createSubjectCate",
  SubjectCateController.createSubjectCate
)

/**
 * @swagger
 * /subjectcate/getListSubjectCate:
 *   post:
 *     summary: Lấy ra danh sách SubjectCate
 *     tags: [SubjectCates]
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
SubjectCateRoute.post("/getListSubjectCate",
  SubjectCateController.getListSubjectCate
)

export default SubjectCateRoute

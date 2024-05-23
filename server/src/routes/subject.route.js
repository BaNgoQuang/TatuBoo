import express from "express"
import SubjectController from "../controllers/subject.controller.js"
import upload from '../middlewares/clouddinary.middleware.js'

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
  upload('Avatar').single('Avatar'),
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
 *               TextSearch: ""
 *               SubjectCateID: ""
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

/**
 * @swagger
 * /subject/updateSubject:
 *   put:
 *     summary: Cập nhật môn học
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the subject to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CourseID:
 *                 type: string
 *               SubjectName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
SubjectRoute.put("/updateSubject",
  SubjectController.updateSubject
)

/**
 * @swagger
 * /subject/deleteSubject:
 *   patch:
 *     summary: Xoá môn học (soft delete)
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: SubjectID
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
SubjectRoute.patch("/deleteSubject",
  SubjectController.deleteSubject
)

export default SubjectRoute

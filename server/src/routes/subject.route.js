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
 *        - AvatarPath
 *      properties:
 *        _id:
 *            type: ObjectId
 *        SubjectCateID: 
 *            type: ObjectId
 *        SubjectName:
 *            type: string
 *        AvatarPath:
 *            type: string
 *        IsDeleted: 
 *            type: boolean
 */

/**
 * @swagger
 * /subject/createSubject:
 *   post:
 *     summary: Create a new subject
 *     tags: [Subjects]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *                SubjectCateID:
 *                  type: ObjectId
 *                SubjectName: 
 *                  type: string
 *                Avatar:
 *                  type: string
 *                  format: binary
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
 *               SubjectCateID: 664c1480b8f11adfc4f4a85b
 *               CurrentPage: 1 
 *               PageSize: 10
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
 *     summary: Update a subject
 *     tags: [Subjects]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *                SubjectID:
 *                  type: ObjectId
 *                SubjectCateID:
 *                  type: ObjectId
 *                SubjectName: 
 *                  type: string
 *                Avatar:
 *                  type: string
 *                  format: binary
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal server error
 */
SubjectRoute.put("/updateSubject",
  upload('Avatar').single('Avatar'),
  SubjectController.updateSubject
)

/**
 * @swagger
 * /subject/deleteSubject/{SubjectID}:
 *   patch:
 *     summary: Xoá môn học (soft delete)
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: SubjectID
 *         schema:
 *           type: ObjectId
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
SubjectRoute.patch("/deleteSubject/:SubjectID",
  SubjectController.deleteSubject
)

export default SubjectRoute

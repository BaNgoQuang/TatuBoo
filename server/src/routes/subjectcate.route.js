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
 *           example:
 *               SubjectCateName: "Music"
 *               Description: "ABC"
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
SubjectCateRoute.post("/getListSubjectCate",
  SubjectCateController.getListSubjectCate
)

/**
 * @swagger
 * /subjectcate/updateSubjectCate:
 *   put:
 *     summary: Cập nhật danh mục
 *     tags: [SubjectCates]
 *     parameters:
 *       - in: path
 *         name: SubjectCateID
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               SubjectCateName:
 *                 type: string
 *               Description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
SubjectCateRoute.put("/updateSubjectCate",
  SubjectCateController.updateSubjectCate
)

/**
 * @swagger
 * /subjectcate/deleteSubjectcate:
 *   patch:
 *     summary: Xoá danh mục (soft delete)
 *     tags: [SubjectCates]
 *     parameters:
 *       - in: path
 *         name: SubjectCateID
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
SubjectCateRoute.patch("/deleteSubjectcate",
  SubjectCateController.deleteSubjectCate
)

export default SubjectCateRoute

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
 *   post:
 *     summary: Cập nhật danh mục
 *     tags: [SubjectCates]
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *               SubjectCateID: 664c1480b8f11adfc4f4a85b
 *               SubjectCateName: string
 *               Description: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
SubjectCateRoute.post("/updateSubjectCate",
  SubjectCateController.updateSubjectCate
)

/**
 * @swagger
 * /subjectcate/deleteSubjectcate/{SubjectCateID}:
 *   get:
 *     summary: Xoá danh mục (soft delete)
 *     tags: [SubjectCates]
 *     parameters:
 *       - in: path
 *         name: SubjectCateID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
SubjectCateRoute.get("/deleteSubjectcate/:SubjectCateID",
  SubjectCateController.deleteSubjectCate
)

/**
 * @swagger
 * /subjectcate/getDetailSubjectCate:
 *   post:
 *     summary: Get chi tiết danh mục
 *     tags: [SubjectCates]
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *               SubjectCateID: 664c1480b8f11adfc4f4a85b
 *               CurrentPage: 0 
 *               PageSize: 0
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
SubjectCateRoute.post("/getDetailSubjectCate",
  SubjectCateController.getDetailSubjectCate
)

export default SubjectCateRoute

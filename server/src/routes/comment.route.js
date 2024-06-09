import express from "express"
import CommentController from "../controllers/comment.controller.js"

const CommentRoute = express.Router()

// Define model trên swagger
/**
 * @swagger
 * components:
 *  schemas:
 *    Comment:
 *      type: object
 *      required: 
 *        - UserID
 *        - TeacherID
 *        - Content
 *        - Rate
 *      properties:
 *        _id:
 *            type: ObjectId
 *        SenderID: 
 *            type: ObjectId
 *        ReceiverID: 
 *            type: ObjectId
 *        Content:
 *            type: string
 *        Rate:
 *            type: number
 */

CommentRoute.post("/createComment",
  CommentController.createComment
)
CommentRoute.post("/getListCommentOfTeacher",
  CommentController.getListCommentOfTeacher
)

CommentRoute.get("/deleteComment/:TeacherID",
  CommentController.deletedComment
)


export default CommentRoute

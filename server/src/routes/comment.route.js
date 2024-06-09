import express from "express"
import CommentController from "../controllers/comment.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js"
import { Roles } from "../utils/lib.js"

const CommentRoute = express.Router()

// Define model trên swagger
/**
 * @swagger
 * components:
 *  schemas:
 *    Comment:
 *      type: object
 *      required: 
 *        - Sender
 *        - Receiver
 *        - Content
 *        - Rate
 *      properties:
 *        _id:
 *            type: ObjectId
 *        Sender: 
 *            type: ObjectId
 *        Receiver: 
 *            type: ObjectId
 *        Content:
 *            type: string
 *        Rate:
 *            type: number
 */

CommentRoute.post("/createComment",
  authMiddleware([Roles.ROLE_STUDENT]),
  CommentController.createComment
)
CommentRoute.post("/getListCommentOfTeacher",
  CommentController.getListCommentOfTeacher
)

CommentRoute.get("/deleteComment/:CommentID",
  authMiddleware([Roles.ROLE_STUDENT]),
  CommentController.deletedComment
)


export default CommentRoute

import CommentSerivce from "../services/comment.service.js";

const createComment = async (req, res) => {
  try {
    const response = await CommentSerivce.fncCreateComment(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const getListCommentOfTeacher = async (req, res) => {
  try {
    const response = await CommentSerivce.fncGetListCommentOfTeacher(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const deletedComment = async (req, res) => {
  try {
    const response = await CommentSerivce.fncDeleteComment(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
}

const CommentController = {
  createComment,
  getListCommentOfTeacher,
  deletedComment
}

export default CommentController

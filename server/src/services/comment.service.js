import Comment from "../models/comment.js"
import User from "../models/user.js"

const fncCreateComment = async (req) => {
  try {
    const newComment = await Comment.create(req.body)
    const updateVote = await User.findByIdAndUpdate(
      req.body.TeacherID,
      { $push: { Votes: req.body.Rate } }
    )
    if (!updateVote) return response({}, true, "User không tồn tại", 200)
    return response(newComment, false, "Tạo comment thành công", 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetListCommentOfTeacher = async (req) => {
  try {
    const { CurrentPage, PageSize, TeacherID } = req.body
    let query = {
      TeacherID: TeacherID,
    }
    const comment = Comment
      .find(query)
      .skip((CurrentPage - 1) * PageSize)
      .limit(PageSize)
    const total = Comment.countDocuments(query)
    const result = handleListQuery([comment, total])
    return response(
      { List: result[0], Total: result[1] },
      false,
      "Lấy ra thành công",
      200
    )
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncDeleteComment = async (req) => {
  try {
    const { CommentID } = req.param.CommentID 
    const deleteComment = await Comment.findByIdAndUpdate(
      CommentID,
      { IsDeleted: true },
      { new: true }
    )
    if (!deleteComment) return response({}, true, "Messenger không tồn tại", 200)
    return response(deletedComment, false, "Xóa Messenger thành công", 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const CommentSerivce = {
  fncCreateComment,
  fncDeleteComment,
  fncGetListCommentOfTeacher
}

export default CommentSerivce
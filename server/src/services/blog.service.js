import { response } from "../utils/lib.js"
import { getOneDocument } from "../utils/queryFunction.js"
import Blog from "../models/blog.js"

const fncCreateBlog = async (req) => {
  try {
    const { Title } = req.body
    const UserID = req.user.ID
    const blog = await getOneDocument(Blog, "Title", Title)
    if (!!blog) return response({}, true, "Tiêu đề blog đã tồn tại", 200)
    const newCreateBlog = await Blog.create({ ...req.body, Teacher: UserID, AvatarPath: req.file.path })
    return response(newCreateBlog, false, "Tạo bài viết thành công", 201)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetDetailBlog = async (req) => {
  try {
    const BlogID = req.params.BlogID
    const blog = await getOneDocument(Blog, "_id", BlogID)
    if (!blog) return response({}, true, "Blog không tồn tại", 200)
    return response(blog, false, "Blog tồn tại", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetListBlog = async (req) => {
  try {
    const { CurrentPage, PageSize } = req.body
    const query = { IsDeleted: false }
    const blogs = Blog
      .find(query)
      .skip((CurrentPage - 1) * PageSize)
      .limit(PageSize)
    const total = Blog.countDocuments(query)
    const result = await Promise.all([blogs, total])
    return response(
      { List: result[0], Total: result[1] },
      false,
      "Lấy ra bài viết thành công",
      200
    )
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncDeleteBlog = async (req) => {
  try {
    const { BlogID } = req.params
    const deletedBlog = await Blog.findByIdAndUpdate(
      BlogID,
      { IsDeleted: true },
      { new: true }
    )
    if (!deletedBlog) return response({}, true, "Bài viết không tồn tại", 200)
    return response(deletedBlog, false, "Xoá bài viết thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncUpdateBlog = async (req) => {
  try {
    const { BlogID, Title } = req.body
    const checkExist = await getOneDocument(Blog, "_id", BlogID)
    if (!checkExist) return response({}, true, "Có lỗi xảy ra", 200)
    const checkExistTitle = await getOneDocument(Blog, "Title", Title)
    if (!!checkExistTitle && !checkExist._id.equals(checkExistTitle._id))
      return response({}, true, "Tiêu đề blog đã tồn tại", 200)
    const updateBlog = await Blog.findOneAndUpdate(
      { _id: BlogID },
      {
        ...req.body,
        AvatarPath: !!req.file ? req.file.path : checkExist?.AvatarPath
      },
      { new: true }
    )
    return response(updateBlog, false, "Cập nhật blog thành công", 200)
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const fncGetListBlogOfTeacher = async (req) => {
  try {
    const UserID = req.user.ID
    const { CurrentPage, PageSize } = req.body
    const query = {
      Teacher: UserID
    }
    const blogs = Blog
      .find(query)
      .skip((CurrentPage - 1) * PageSize)
      .limit(PageSize)
    const total = Blog.countDocuments(query)
    const result = await Promise.all([blogs, total])
    return response(
      { List: result[0], Total: result[1] },
      false,
      "Lấy ra bài viết thành công",
      200
    )
  } catch (error) {
    return response({}, true, error.toString(), 500)
  }
}

const BlogService = {
  fncCreateBlog,
  fncGetListBlog,
  fncDeleteBlog,
  fncGetDetailBlog,
  fncUpdateBlog,
  fncGetListBlogOfTeacher
}

export default BlogService

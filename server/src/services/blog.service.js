import { response } from "../utils/lib.js"
import { getOneDocument,  handleListQuery } from "../utils/queryFunction.js"
import Blog from "../models/blog.js"

const fncCreateBlog = async (req) => {
    try {
      const newCreateBlog = await Blog.create(req.body)
      return response(newCreateBlog, false, "Tạo bài viết thành công", 201)
    } catch (error) {
      return response({}, true, error.toString(), 500)
    }
}

const fncGetListBlog = async (req) => {
    try {
    const {CurrentPage, PageSize } = req.body
    const query = { IsDeleted: false };
    const blogs = Blog 
    .find(query)
    .skip((CurrentPage - 1) * PageSize)
    .limit(PageSize);
  const total = Blog.countDocuments(query); 
  const result = await handleListQuery([blogs, total]);
  return response(
    { List: result[0], Total: result[1] },
    false,
    "Lấy ra bài viết thành công",
    200
  );
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

const fncFollowBlog = async (req) => {
    try {
        const { BlogID } = req.body
        const updatedFollow = await Blog.findByIdAndUpdate(
          BlogID,
          {
            Followers: Followers + 1,
          },
          { new: true, runValidators: true }
        )
        if (!updatedFollow) return response({}, true, "Bài viết không tồn tại", 200)
        return response(updatedFollow, false, "Cập nhật follow thành công", 200)
      } catch (error) {
        return response({}, true, error.toString(), 500)
      }
}

const BlogService = {
fncCreateBlog,
fncGetListBlog,
fncDeleteBlog
}

export default BlogService

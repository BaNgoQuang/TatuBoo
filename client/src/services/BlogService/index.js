import http from "../index"
import {
  apiCreateBlog,
  apiDeleteBlog,
  apiGetBlogDetail,
  apiGetListBlog,
  apiUpdateBlog
} from "./urls"

const createBlog = body => http.post(apiCreateBlog, body)
const updateBlog = body => http.post(apiUpdateBlog, body)
const getListBlog = body => http.post(apiGetListBlog, body)
const getDetailBlog = params => http.get(`${apiGetBlogDetail}?BlogID=${params}`)
const deleteBlog = params => http.get(`${apiDeleteBlog}?BlogID=${params}`)
const followBlog = body => http.post(apiGetListBlog, body)

const BlogService = {
  createBlog,
  updateBlog,
  getListBlog,
  getDetailBlog,
  deleteBlog,
  followBlog,
}

export default BlogService
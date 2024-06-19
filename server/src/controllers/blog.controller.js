import BlogService from "../services/blog.service.js"

const createBlog = async (req, res) => {
    try {
      const response = await BlogService.fncCreateBlog(req)
      return res.status(response.statusCode).json(response)
    } catch (error) {
      return res.status(500).json(error.toString())
    }
}

const getListBlog = async (req, res) => {
    try {
      const response = await BlogService.fncGetListBlog(req)
      return res.status(response.statusCode).json(response)
    } catch (error) {
      return res.status(500).json(error.toString())
    }
}

const deletedBlog = async (req, res) => {
    try {
      const response = await BlogService.fncDeleteBlog(req)
      return res.status(response.statusCode).json(response)
    } catch (error) {
      return res.status(500).json(error.toString())
    }
}

const followBlog = async (req, res) => {
    try {
      const response = await BlogService.fncFollowBlog(req)
      return res.status(response.statusCode).json(response)
    } catch (error) {
      return res.status(500).json(error.toString())
    }
} 

const getBlogDetail = async (req, res) => {
  try {
    const response = await BlogService.fncGetBlogDetail(req)
    return res.status(response.statusCode).json(response)
  } catch (error) {
    return res.status(500).json(error.toString())
  }
} 

const BlogController = {
createBlog,
getListBlog,
deletedBlog,
followBlog,
getBlogDetail
}

export default BlogController

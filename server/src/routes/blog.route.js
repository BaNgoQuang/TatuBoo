import express from "express"
import BlogController from "../controllers/blog.controller.js"

const BlogRoute = express.Router()


// Define model trên swagger
/**
 * @swagger
 * components:
 *  schemas:
 *    Blogs:
 *      type: object
 *      required: 
 *        - Title
 *        - Contents
 *      properties:
 *        _id:
 *            type: ObjectId
 *        Author: 
 *            type: ObjectId
 *        Title:
 *            type: String
 *        Contents:
 *            type: String
 *        Followers:
 *            type: Number
 *        IsDeleted: 
 *            type: boolean
 */

/**
 * @swagger
 * /blog/createBlog:
 *   post: 
 *     tags: [Blogs]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *                Author:
 *                  type: ObjectId
 *                Title: 
 *                  type: string
 *                Contents:
 *                  type: string
 *                Followers:
 *                  type: number              
 *     responses:
 *       201:
 *         description: Tạo bài viết thành công
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal server error
 */
BlogRoute.post("/createBlog",
    BlogController.createBlog
)

/**
 * @swagger
 * /blog/getListBlog:
 *   post:
 *     tags: [Blogs]
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *               CurrentPage: 1 
 *               PageSize: 10
 *     responses:
 *       200:
 *         description: Lấy ra bài viết thành công
 *       500:
 *         description: Internal server error
 */
BlogRoute.post("/getListBlog",
    BlogController.getListBlog
)

/**
 * @swagger
 * /blog/deleteBlog/{BlogID}:
 *   get:
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: BlogID
 *         schema:
 *           type: ObjectId
 *     responses:
 *       200:
 *         description: Xoá bài viết thành công
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
BlogRoute.get("/deleteBlog/:BlogID",
    BlogController.deletedBlog
)

/**
 * @swagger
 * /blog/followBlog:
 *   post:
 *     tags: [Blogs]
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *               BlogID:  
 *     responses:
 *       200:
 *         description: Cập nhật follow thành công
 *       500:
 *         description: Internal server error
 */
BlogRoute.post("/followBlog",
    BlogController.getListBlog
)

/**
 * @swagger
 * /blog/getBlogDetail/{BlogID}:
 *   get:
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: BlogID
 *         schema:
 *           type: ObjectId
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
BlogRoute.get("/getBlogDetail/:BlogID",
    BlogController.getBlogDetail
  )
  
export default BlogRoute

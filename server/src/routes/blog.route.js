import express from "express"
import BlogController from "../controllers/blog.controller.js"

const BlogRoute = express.Router()

// Define model trên swagger
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
 *        Title: 
 *            type: String
 *        Description: 
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                  Title: 
 *                    type: string
 *                  Content: 
 *                    type: string 
 *        Followers:
 *            type: Number
 */

export default BlogRoute

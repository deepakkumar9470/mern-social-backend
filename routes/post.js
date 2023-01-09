import express from "express";
import { createPost, getFeedPosts , getUserPosts, likePost } from "../controllers/post.js";
import verifyToken from '../middleware/auth.js'


const router = express.Router()

//@  /api/post/
router.post('/post', verifyToken, createPost)

//@  /api/post
router.get('/', verifyToken, getFeedPosts)

//@  /api/post/:userId
router.get('/:userId', verifyToken, getUserPosts)

//@  /api/post/:id/like
router.patch('/o', verifyToken, likePost)


export default router
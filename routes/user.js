import express from "express";
import { addRemoveFriend, getUser, getUserFriends } from "../controllers/user.js";
import verifyToken from '../middleware/auth.js'


const router = express.Router()

//@  /api/user/:id

router.get('/:id', getUser)

//@  /api/user/id/friends
router.get('/:id/friends', verifyToken, getUserFriends)

//@  /api/user/id/friendId
router.patch('/:id/:friendId',verifyToken, addRemoveFriend)

export default router
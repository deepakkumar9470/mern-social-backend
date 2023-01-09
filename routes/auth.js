import express from "express";
import { loginUser, registerUser } from "../controllers/auth.js";
import upload from "../imageupload/fileUpload.js";


const router = express.Router()

//@  /api/auth/register
// with files

router.post('/register',upload.single('picture'), registerUser)


//@  /api/auth/login
router.post('/login', loginUser)


export default router
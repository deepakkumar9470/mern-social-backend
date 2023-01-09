import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import cors from 'cors'
import helmet from 'helmet';
import morgan from 'morgan';
const app = express()
const PORT = process.env.PORT || 8000
import connecttoDB from './db/db.js'
import authRoute from './routes/auth.js'
import postRoute from './routes/post.js'
import userRoute from './routes/user.js'
import {users,posts} from './dummyData/data.js'
import User from './models/User.js';
import Post from './models/Post.js';

app.use(cors())
app.use(express.json())
app.use(helmet.crossOriginResourcePolicy({policy : "cross-origin"}))
app.use(morgan('common'))
app.use(express.urlencoded({extended  :true, limit: "30mb"}))

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api', postRoute)

//app.use("/assets", express.static(path.join(__dirname, "public/assets")));
// app.use('/uploads', express.static('public/uploads'))
app.use('/uploads', express.static('./uploads'))

connecttoDB()

app.get('/', (req,res)=>{
    res.send('hello')
    User.insertMany(users)
    Post.insertMany(posts)
})



app.listen(PORT, ()=>{
    console.log(`Server started at port http://localhost:${PORT}`)
})
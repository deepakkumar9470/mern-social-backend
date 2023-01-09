import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const registerUser = async  (req,res) =>{

    const {firstName,lastName,email,password,picturePath,
           friends,location,occupation} = req.body
    
    try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const newUser = await User({
          firstName,
          lastName,
          email,
          password : hashPassword,
          picturePath,
          friends,
          location,
          occupation,
          viewedProfile  :  Math.floor(Math.random() * 10000),
          impression :  Math.floor(Math.random() * 10000)
        })
        await newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({error : error.message})
    }       

}



export const loginUser = async  (req,res) =>{

    const {email,password} = req.body
    
    try {
         const user = await User.findOne({email : email})
         if(!user) res.status(400).json({msg: 'User not found'})

         const isMatch = await bcrypt.compare(password,user.password)
         if(!isMatch) res.status(400).json({msg: 'Invalid credentials'})
         const token = await jwt.sign({_id : user._id}, process.env.JWT_SECRET_TOKEN)
         delete user.password

         res.status(200).json({
            token,
            user
         })
    } catch (error) {
        res.status(500).json({error : error.message})
    }       

}


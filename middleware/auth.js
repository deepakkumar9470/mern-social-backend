import jwt from 'jsonwebtoken'
import User from '../models/User.js'


const verifyToken = async (req,res,next) =>{

    
    try {
        let token = req.header('Authorization')
        if(!token) res.status(403).send('Oops Access denied')

        if(token.startsWith('Bearer')){
            token = token.slice(7, token.length).trimLeft()
        }
        const verified = await jwt.verify(token, process.env.JWT_SECRET_TOKEN)
        req.user = verified
        next()
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

export default verifyToken
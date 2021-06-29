const Users= require('../models/userModel')
const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken')

const authCtrl = {
    register: async(req, res)=>{
        try{
            // take fullname, username,email, password, gender from form
            //check username, email, password
            //hash password
            //create new user
            //create and refresh token
            //response to cookie
            //save model and return status, access_token and return user(no show password)
            const {fullname, username, email, password, gender} =req.body
            let newUserName = username.toLowerCase().replace(/ /g, '') //???
            const user_name= await Users.findOne({username: newUserName})
            if(user_name) return res.status(400).json({msg: "This user name already exists."})
            const user_email= await Users.findOne({email})
            if(user_email) return res.status(400).json({msg: "This email already exists."})
            if(password.length<6) return res.status(400).json({msg: "Password must be at least 6 characters"})

            const hashedPassword= await bcrypt.hash(password, 12)

            const newUser= new Users({
                fullname, username: newUserName, email, password: hashedPassword, gender
            })
            const access_token= createAccessToken({id: newUser._id})
            const refresh_token= refreshAccessToken({id: newUser._id})

            res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                path: 'api/refresh_token', 
                maxAge: 30*24*60*60*1000
            })

            await newUser.save()

            res.json({
                msg: 'Register Success!',
                access_token,
                user:{
                    ...newUser._doc, 
                    password:''
                }
            })
        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    login: async(req, res)=>{
        try{
            const {email, password}= req.body
            //Populate will automatically replace the specified path in the document, with document(s) from other collection(s).


            const user= await Users.findOne({email}).populate(
                'followers following',
                'avatar username fullname followers following'
            )            
            if(!user) return res.status(400).json({msg: "This user doesn't exists."})
            const isMatch= await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Incorrect Password. Try again! "})

            const access_token= createAccessToken({id: user._id})
            const refresh_token= refreshAccessToken({id: user._id})

            res.cookie('refresh_token', refresh_token, {
                httpOnly: true, 
                path: '/api/refresh_token',
                maxAge: 30*24*60*60*1000
            })
            res.json({
                msg: 'Login Success!',
                access_token, 
                user: {
                    ...user._doc,
                    password: ''
                }
            })

        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async(req, res)=>{
        try{
            //Clear cookie where refreshtoken is stored
            res.clearCookie('refreshtoken', {path: '/api/refresh_token'})
            return res.json({msg: 'Logged out!'})
        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    generateAccessToken: async(req, res)=>{
        //jwt.verify verify a given refreshtoken using secret key to get 
        //a decoded token token(via user)
        //this function is called when register or login
        try{
            const rf_token = req.cookies.refresh_token
            if(!rf_token) return res.status(400).json({msg: " login now!"})
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, async(err, result)=>{
                if(err) return res.status(400).json({msg: "Please login now!"})
                const user= await Users.findById(result.id).select("-password").populate(
                    'followers following',   //get all followers and following
                    'avatar username fullname followers following' //response 
                )
                if(!user) return res.status(400).json({msg: "This user doesn't exists."})
                const access_token= createAccessToken({id: result.id})
                res.json({
                    access_token,
                    user
                })
            })
        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
}

const createAccessToken=(payload)=>{
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}
const refreshAccessToken=(payload)=>{
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30d'})
}
module.exports= authCtrl
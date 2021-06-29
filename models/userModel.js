// fullname, username, email, password, avatar, role, gender, mobile, story, 
// website, followers, following, save

const mongoose= require('mongoose')

const userSchema= new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim:true, 
        mexlength: 25
    },
    username:{
        type: String, 
        required: true,
        trim: true,
        maxlength: 25, 
        unique: true
    },
    email:{
        type: String, 
        required: true,
        trim: true, 
        unique: true,
    
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String, 
        default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
    },
    role:{
        type: String, default: 'user'
    },
    gender: {
        type: String, default: 'male'
    }, 
    address:{
        type: String, default: ''
    },
    story:{
        type: String, 
        maxlength: 250,
        default: ''
    }, 
    website:{
        type: String, default: ''
    },
    followers:[{type: mongoose.Types.ObjectId, ref: 'user'}]
    ,
    following: [{type: mongoose.Types.ObjectId, ref: 'user'}]
    ,
    saved: [{type: mongoose.Types.ObjectId, ref:'user'}]
},{
    timestamps: true
})

module.exports= mongoose.model('user', userSchema) //model named user
const Posts = require('../models/postModel')
// const Comments= require('../models/commentModel')
const Users= require('../models/userModel')

class APIfeatures{
    constructor(query, queryString){
        this.query=query;
        this.queryString=queryString;
    }
    paginating(){
        const page=this.queryString.page*1 ||1
        const limit= this.queryString.limit*1||9
        const skip= (page-1)*limit
        this.query= this.query.skip(skip).limit(limit)
        return this;
    }
}


const postCtrl={
    createPost: async(req, res)=>{
        try {
            const { content, images} = req.body

            if(images.length===0) return res.status(400).json({msg: "Please add your photo."})
            
            const newPost= new Posts({
                content, images, user: req.user._id
            })
            await newPost.save()
            res.json({
                msg: "Created Post!",
                newPost:{
                    ...newPost._doc,
                    user: req.user
                }
            })
        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },

    getPosts: async(req, res)=>{
        // Get all posts of this user and following users and then paginate them.
        try{
            const features= new APIfeatures(Posts.find({
                user: [...req.user.following, req.user._id]
            }), req.query).paginating()

            const posts= await features.query.sort('-createdAt')
            .populate('user likes', 'avatar usename fullname followers')
            .populate({
                path: 'comments',
                populate:{
                    path: 'user likes',
                    select: '-password'
                }
            })

            res.json({
                msg: "Successfully!",
                result: posts.length,  // We need result and page to display pagination.
                posts
            })

        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },

    updatePost: async(req, res)=>{
        try{
            const {content, images}= req.body;
            const post= await Posts.findOneAndUpdate({_id: req.params.id}, {
                content, images
            }).populate('user likes', 'avatar username fullname')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user likes', 
                    select: '-password'
                }
            })
            res.json({
                msg:'Everything up to date!',
                newPost: {
                    ...post._doc,
                    content, images
                }
            })
        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    likePost: async(req, res)=>{
        try{

        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    unLikePost: async(req, res)=>{
        try{

        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },getUserPosts: async(req, res)=>{
        try{

        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },getPost: async(req, res)=>{
        try{

        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },getPostsDiscover: async(req, res)=>{
        try{

        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },deletePost: async(req, res)=>{
        try{

        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    getPosts: async(req, res)=>{
        try{

        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    savePost: async(req, res)=>{
        try{

        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    unSavePost: async(req, res)=>{
        try{

        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    getSavePosts: async(req, res)=>{
        try{

        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    
}

module.exports = postCtrl
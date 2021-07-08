const Comments= require('../models/commentModel')
const Posts= require('../models/postModel')


const commentCtrl={
    createComment: async(req, res)=>{
        try{
            // ...newComment= {content, tag, reply}
            const { postId, content, tag, reply, postUserId } = req.body
            console.log(postId)
            // Find this post, created new comment, update new comment by $push and save comment.
            const post = await Posts.findById(postId)
            if(!post) return res.status(400).json({msg: "This post does not exists."})
            
            const newComment =new Comments({
                user: req.user._id, content, tag, reply, postUserId, postId
            })

            await Posts.findOneAndUpdate({_id: postId}, {
                $push: {comments: newComment._id} // in post model we use ref='comment'
            }, {new: true})

            await newComment.save()
            res.json({newComment})

        } catch(err){
            res.status(500).json({msg: err.message})
        }
    }, 
    updateComment: async(req, res)=>{
        try{
            const {content}= req.body
            await Comments.findOneAndUpdate({_id: req.params.id, user: req.user._id},{
                content
            }) //Just user who created comment can update it
            res.json({msg: "Everything up to date"})
        } catch(err){
            res.status(500).json({msg: err.message})
        }
    },
    likeComment: async(req, res)=>{
        try{
            // Check if user already like this comment. (I think it dose not necessary.)
            const comment= await Comments.find({_id: req.params.id, likes: req.user._id})
            if(comment.length>0) return res.status(400).json({msg: "You like this comment already!"})
            
            await Comments.findOneAndUpdate({_id: req.params._id}, {
                $push: {likes: req.user._id}
            }, {new: true})
            res.json({msg: 'Liked comment!'})
        } catch(err){
            res.status(500).json({msg: err.message})
        }
    },
    unLikeComment: async(req, res)=>{
        try{
            await Comments.findOneAndUpdate({_id: req.params.id}, {
                $pull: {likes: req.user._id}
            }, {new: true})
            res.json({msg: 'UnLiked comment!'})
        } catch(err){
            res.status(500).json({msg: err.message})
        }
    },
    deleteComment: async (req, res) => {
        try {
            const comment = await Comments.findOneAndDelete({
                _id: req.params.id,
                $or: [
                    {user: req.user._id},
                    {postUserId: req.user._id}
                ]
            })
            console.log(comment)

            await Posts.findOneAndUpdate({_id: comment.postId}, {
                $pull: {comments: req.params.id}
            })

            res.json({msg: 'Deleted Comment!'})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

}

module.exports= commentCtrl
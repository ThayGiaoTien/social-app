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
    }
}

module.exports= commentCtrl
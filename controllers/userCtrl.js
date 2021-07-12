const Users= require('../models/userModel')

const userCtrl={
    searchUser: async(req, res)=>{
        // Get fullname, usernamee and avatar of 10 users, who relate with username input
        try{
            const users= await Users.find({username: {$regex: req.query.username}})
            .limit(10).select("fullname username avatar")
            res.json({users})
            

        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    getUser: async(req, res)=>{
        try{
            try {
                const user = await Users.findById(req.params.id).select('-password')
                .populate("followers following", "-password")
                if(!user) return res.status(400).json({msg: "User does not exist."})
                
                res.json({user})
                
            } catch (err) {
                return res.status(500).json({msg: err.message})
            }
        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    updateUser: async(req, res)=>{
        try{
            const {avatar,fullname, mobile, address, website, story, gender}= req.body
            if(!fullname) return res.status(400).json({msg: 'Please add your full name'})
            
            await Users.findOneAndUpdate({_id: req.user._id },{  //req.user._id because we call this function after called getUser()
                avatar, fullname, mobile, address, story, website, gender
            })
            res.json({msg: "Every thing up to date!"})

        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    follow: async(req, res)=>{
        // the $push operator appends a specified value to an array
        try{   
            const users = await Users.find({_id: req.params.id, followers: req.user._id})
            if(users.length>0) return res.status(500).json({msg:"You followed this user."})

            const newUser= await Users.findOneAndUpdate({_id: req.params.id},{
                $push: {followers: req.user._id}
            }, {new: true}).populate("followers following", "-password")
            await Users.findOneAndUpdate({_id: req.user._id},{
                $push: {following: req.params.id}
            }, {new: true})
            res.json({newUser})
            
        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    unfollow: async(req, res)=>{
        //The $pull operator removes from an existing array all instances of a value or values that match a specified condition.
        try{
            const newUser= await Users.findOneAndUpdate({_id: req.params.id},{
                $pull : {followers: req.user._id}
            },{new: true}).populate('followers following', '-password')
            await Users.findOneAndUpdate({_id: req.user._id},{
                $pull: {following: req.params.id}},{
                    new: true}
            )
        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    suggestionsUser: async(req, res)=>{
        try{
            const newArr=[...req.user.following, req.user._id]
            const num = req.query.num ||10

            const users= await Users.aggregate([
                { $match: { _id: {$nin : newArr}}},
                { $sample: { size: Number(num)}},
                
                
                { $lookup: { from: 'users', localField: 'followers', foreignField: '_id', as: 'followers'}},
                { $lookup: { from: 'users', localField: 'following', foreignField: '_id', as: 'following'}},

                // {
                //     $lookup:
                //       {
                //         from: <collection to join>,
                //         localField: <field from the input documents>,
                //         foreignField: <field from the documents of the "from" collection>,
                //         as: <output array field>
                //       }
                //  }
            ]).project('-password')

            return res.json({
                users, 
                result: users.length
            })
        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },

}

module.exports= userCtrl
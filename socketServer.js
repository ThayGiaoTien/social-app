let users= [

]

const EditData=  (data, id, call) =>{
    const newData= data.map(item=>
        item.id===id? {...item, call} : item 
    )
    return newData
}

const SocketServer=(socket)=>{
    // Connect-Disconnect
    // If user is not logged in, user won't get notification
    socket.on('joinUser', user=>{
        users.push({id: user._id, socketId: socket.id, followers: user.followers})
        console.log({users})
    })
    
    socket.on('disconnect', ()=>{
        const data= users.find(user=>user.socketId=== socket.id)
        if(data){
            const clients= users.filter(user=>
                data.followers.find(item=>item._id===user.id)

            )
            
            if(clients.length>0){
                clients.forEach(client=>{
                    socket.to(`${client.socketId}`).emit('CheckUserOffline', data.id)
                })
            }

            if(data.call){
                const callUser= users.find(user=user.id === data.call)
                if(callUser){
                    users= EditData(users, callUser.id, null)
                    socket.to(`${callUser.socketId}`).emit('callerDisconnect')
                }
            }
        }

        users= users.filter(user=>user.socketId !== socket.id)
    })
    

    // Likes
    socket.on('likePost', newPost=>{
        const ids= [...newPost.user.followers, newPost.user._id]
        const clients= users.filter(user=>ids.includes(user.id))     // user:{id: user._id, socketId, followers}
        console.log({ids,clients})
        if(clients.length>0) {
            clients.forEach(client=>{
                socket.to(`${client.socketId}`).emit('likeToClient', newPost)
            })
        }
    })

    socket.on('unLikePost', newPost=>{
        const ids= [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user=>ids.includes(user.id))
        console.log({ids,clients})
        if(clients.length>0) {
            clients.forEach(client=>{
                socket.to(`${client.socketId}`).emit('unLikeToClient', newPost)
            })
        }
    })

    // Comments
    socket.on('createComment', newPost=>{
        const ids= [...newPost.user.followers, newPost.user._id]
        const clients= users.filter(user=>ids.includes(user.id))
        if(clients.length>0){
            clients.forEach(client=>{
                socket.to(`${client.socketId}`).emit('createCommentToClient', newPost)
            })
        }
    })

    socket.on('deleteComment', newPost=>{
        const ids= [...newPost.user.followers, newPost.user._id]
        const clients= users.filter(user=> ids.includes(user.id))
        if(clients.length>0){
            clients.forEach(client=>{
                socket.to(`${client.socketId}`).emit('deleteCommentToClient', newPost)
            })
        }
    })

    // Follow
    socket.on('follow', newUser=>{
        const user= users.find(user=>user.id===newUser._id)
        user && socket.to(`${user.socketId}`).emit('followToClient', newUser)
    })
    socket.on('unFollow', newUser=>{
        const user= users.find(user=> user.id===newUser._id)
        user && socket.to(`${user.socketId}`).emit('unFollowToClient', newUser)
    })

    // Notification
    socket.on('createNotify', msg=>{
        const client= users.find(user=>msg.recipients.includes(user.id))
        client && socket.to(`${client.socketId}`).emit('createNotifyToClient', msg)
    })
    socket.on('removeNotify', msg=>{
        const client= users.find(user=>msg.recipients.includes(user.id))
        client && socket.to(`${client.socketId}`).emit('removeNotifyToClient', msg)
    })

    // Message 

    // Check user is Online/Offline

    // Call User
}


module.exports = SocketServer
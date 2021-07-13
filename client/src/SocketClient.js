import React, {useEffect, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { POST_TYPES} from './redux/actions/postAction'
import { GLOBALTYPES } from './redux/actions/globalTypes'
// import { NOTIFY_TYPES } from './redux/actions/notifyAction'
// import { MESS_TYPES } from './redux/actions/messageAction'
import audiobell from './audio/got-it-done-613.mp3'

const spawnNotification=(body, icon, url, title)=>{

}


const SocketClient = () => {
    const {auth, socket} = useSelector(state=>state)
    const dispatch= useDispatch()

    const audioRef= useRef()

    // joinUser
    useEffect(()=>{
        socket.emit('joinUser', auth.user)
    },[socket, auth.user])

    // Likes
    useEffect(()=>{
        socket.on('likeToClient', newPost=>{
            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
        })
        return () => socket.off('likeToClient')
    },[socket, dispatch])
    useEffect(()=>{
        socket.on('unLikeToClient', newPost=>{
            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
        })
        return ()=> socket.off('unLikeToClient')
    })

    // Comments
    useEffect(()=>{
        socket.on('createCommentToClient', newPost=>{
            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
        },[socket,dispatch])
        return()=>socket.off('createCommentToClient')
    })
    useEffect(()=>{
        socket.on('deleteCommentToClient', newPost=>{
            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
        },[socket, dispatch])
        return ()=> socket.off('deleteCommentToClient')
    })
    // Follow
    useEffect(()=>{
        socket.on('followToClient', newUser=> {
            dispatch({type: GLOBALTYPES.AUTH, payload: newUser})
        }, socket, dispatch)
        return ()=>socket.off('followToClient')
    })
    useEffect(()=>{
        socket.on('unFollowToClient', newUser=>{
            dispatch({type: GLOBALTYPES.AUTH, payload: newUser})
        },[socket, dispatch])
        return ()=>socket.off('unFollowToClient')
    })

    // Notification

    // Message

    // Check user Online/Offline

    // Call User


    return (
        <>
            <audio controls ref={audioRef} style={{display: 'none'}}>
                <source src= {audiobell} type='audio/mp3' />
            </audio>
        </>
    )
}

export default SocketClient

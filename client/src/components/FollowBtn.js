import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {follow, unfollow} from '../redux/actions/profileAction'

const FollowBtn = ({user}) => {
    const [followed, setFollowed]= useState(false)
    
    const {auth, profile}= useSelector(state=>state)
    const dispatch = useDispatch()

    const [load, setLoad]= useState(false)

    //check if user._id= auth.user.following.find(item._id) then set followed= true
    useEffect(()=>{
        if(auth.user.following.find(item=>
            item._id===user._id)){
                setFollowed(true)
        }
        return ()=> setFollowed(false)

    }, [auth.user.following, user._id])
    
    const handleFollow=async()=>{
        if(load) return ;
        setFollowed(true)
        setLoad(true)
        await dispatch(follow({users: profile.users, user, auth}))
        setLoad(false)
    }
    const handleUnFollow=async()=>{
        if(load) return ;
        setFollowed(false)
        setLoad(true)
        await dispatch(unfollow({users: profile.users, user, auth}))
        setLoad(false)
    }
    
    return (
        <>
            {
                followed
                ? <button className='btn btn-outlined-danger'
                onClick={handleUnFollow}>
                    UnFollow
                </button>
                : <button className='btn btn-outlined-info'
                onClick={handleFollow}>
                    Follow
                </button>
            }
        </>

    )
}

export default FollowBtn

import React, {useState, useEffect} from 'react'
import Avatar from '../Avatar'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'

import EditProfile from './EditProfile'
import FollowBtn from '../FollowBTn'
// import Followers from './Followers'
// import Following from './Following'

const Info = ({auth, profile, dispatch, id}) => {
    // There exist two possibilities, first the if of param===auth.id, so we 
    // just need to get user profile from auth.user and change state of userData
    // second this user profile just wrote in profile.users state, we need to 
    // filter it and then change state of userData
    const [userData, setUserData]= useState([])
    const [onEdit, setOnEdit]= useState(false)
    
    useEffect(()=>{
        if(id===auth.user._id) {
            setUserData([auth.user])
        } else {
            const newData= profile.users.filter(user=>user._id === id)
            setUserData(newData)
        }
    }, [auth, profile.users, dispatch, id])
    console.log(userData)
    return (
        <div>
            {
                userData.map(user=>(
                    <div className='info_container' key={user._id}>
                        <Avatar src={user.avatar} size='super-avatar'/>

                        <div className='info_content'>
                            <div className='info_content_title'>
                                <h2>{user.username}</h2>
                            
                            {
                                user._id===auth.user._id?
                                <button className='btn btn-outline-info'
                                onClick={()=>setOnEdit(true)}>Edit Profile</button>
                                : <FollowBtn user={user}/>
                            }
                            </div>
                        

                            <div className='follow_btn'>
                                <span className='mr-4' onClick={(_=>{})}>
                                    {user.followers.length} Followers
                                </span>
                                <span className='ml-4' onClick={()=>{}}>
                                    {user.following.length} Following
                                </span>
                            </div>

                            <h6>{user.fullname}<span className='text-danger'>{user.mobile}</span></h6>
                            <p className='m-0'>{user.address}</p>
                            <h6 className='m-0'>{user.email}</h6>
                            <a href={user.website} target="_blank" rel='noreferer'>
                                {user.website}
                            </a>
                            <p>{user.story}</p>
                        </div>
                        {
                            onEdit && <EditProfile setOnEdit={setOnEdit}/>
                        }
                    
            
                    </div>
                ))
            }
        </div>
    )
}

export default Info



//get id from params, auth from selector
//call api to get user info, then change state of userData
//render it to display : avatar, username, followers(0), following(0), 
//fullname, address, email, website, story
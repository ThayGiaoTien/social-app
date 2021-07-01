//first create info and posts components
import React, {useState, useEffect} from 'react'

import Info from '../../components/profiles/Info'
import Posts from '../../components/profiles/Posts'

import { useSelector, useDispatch } from 'react-redux'
import LoadIcon from '../../images/loading.gif'
import { getProfileUsers } from '../../redux/actions/profileAction'
import { useParams } from 'react-router'

const Profile= () => {
    //  we get profile and auth from state, get id from useParams
    // If id is new(!== every of profile.ids) then dispatch action  
    //getProfileUsers to change state of all profile !!! . then pass it to Info component to render

    const dispatch= useDispatch()
    const {id}= useParams()
    const {profile, auth} = useSelector(state=>state)

    useEffect(()=>{
        if(profile.ids.every(idd=>idd!==id)){
            dispatch(getProfileUsers({id, auth}))
        }
    },[id, profile.ids, auth, dispatch])
  
    return (
        <div className='profile'>
            <Info auth={auth} profile={profile} dispatch={dispatch} id={id}/>
            <Posts />
        </div>
    )
}

export default Profile

// get, update, follow unfollow functions

import {GLOBALTYPES} from './globalTypes'
import {getDataAPI, patchDataAPI} from '../../utils/fetchData'
import {imageUpload} from '../../utils/imageUpload'
// import {createNotify, removeNotify} from '../actions/notifyAction'

export const PROFILE_TYPES={
    LOADING: 'LOADING_PROFILE',
    GET_USER: 'GET_PROFILE_USER',
    FOLLOW:'FOLLOW',
    UNFOLLOW: 'UNFOLLOW',
    GET_ID:'GET_PROFILE_ID',
    GET_POSTS:'GET_PROFILE_POSTS',
    UPDATE_POST: 'UPDATE_PROFILE_POST'
}

export const getProfileUsers=({id, auth})=>async(dispatch)=>{
    dispatch({type:PROFILE_TYPES.GET_ID, payload: id})
    try{
        dispatch({type: PROFILE_TYPES.LOADING, payload:true})
        const users= await getDataAPI(`/user/${id}`, auth.token)
        // const posts= await getDataAPI(`/user_posts/${id}`,auth.token )
        
        dispatch({
            type: PROFILE_TYPES.GET_USER,
            payload: users.data
        })
        // dispatch({
        //     type: PROFILE_TYPES.GET_POSTS,
        //     payload: {
        //         ...posts.data, _id: id, page: 2 //what the hell is it??
        //     }
        // })
        dispatch({type: PROFILE_TYPES.LOADING, payload: false})
    }catch(err){
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload:{
                error: err.response.data.msg
            }
        })
    }

}
export const updateProfile=({userData, avatar, auth})=>async(dispatch)=>{
    //first, check fullname exists, fullname.length, story.length
    //try , if have avatar so upload to cloudinary(it will return array of public_id and url) 
    // and then send patch request to server to update 
    if(!userData.fullname)
        return dispatch({type: GLOBALTYPES.ALERT, payload: {error: "Please add your full name."}})
    if(userData.fullname.length>25) 
        return dispatch({type: GLOBALTYPES.ALERT, payload:{
            error: "Your full name too long."
        }})
    if(userData.story.length>200) 
        return dispatch({type: GLOBALTYPES.ALERT, payload: {
            error: "Your story too long."
        }})
    
    try{
        let media; // array which imageUpload will return 
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
       
        if(avatar) media = await imageUpload([avatar])  //image Upload take an array of images
        
        const res= await patchDataAPI('user', {
            ...userData,avatar: avatar ? media[0].url : auth.user.avatar
        }, auth.token)
        console.log(res)
        dispatch({
            type: GLOBALTYPES.AUTH,
            payload:{
                ...auth, 
                user: {
                    ...auth.user, ...userData, 
                    avatar: avatar? media[0].url : auth.user.avatar

                }
            }
        })
        dispatch({type: GLOBALTYPES.ALERT,payload: {success: res.data.msg}})
    } catch(err){
        dispatch({type: GLOBALTYPES.ALERT, payload: {
            error: err.response.data.msg
        }})
    }
}
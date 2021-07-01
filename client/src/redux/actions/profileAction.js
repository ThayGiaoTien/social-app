// get, update, follow unfollow functions

import {GLOBALTYPES} from './globalTypes'
import {getDataAPI, patchDataAPI} from '../../utils/fetchData'
// import {imageUpload } from '../utils/imageUpload'
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
        console.log(users.data)
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
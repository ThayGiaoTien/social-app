import { getDataAPI, postDataAPI, patchDataAPI, deleteDataAPI } from "../../utils/fetchData"
import { GLOBALTYPES } from "./globalTypes"
import {imageUpload} from '../../utils/imageUpload'
// import { createNotify, removeNotify} from './notifyAction'
export const POST_TYPES={
    CREATE_POST: 'CREATE_POST',
    LOADING_POST:'LOADING_POST',
    GET_POSTS: 'GET_POSTS',
    UPDATE_POST: 'UPDATE_POST',
    GET_POST: 'GET_POST',
    DELETE_POST:'DELETE_POST'
}

export const createPost=({content, images, auth})=>async(dispatch)=>{
    let media=[];
    try{    
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
        if(images.length>0) media= await imageUpload(images)

        const res= await postDataAPI('posts', {content, images: media}, auth.token)
        console.log(res)
        dispatch({
            type: POST_TYPES.CREATE_POST,
            payload: {
                ...res.data.newPost, user: auth.user
            }
        })
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false}})
        
        //Notify 

    } catch(err){
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}
export const getPosts=(token)=>async(dispatch)=>{
    // getPosts in backend will find all posts of this user and users which 
    //this user is following. then return a {msg, length, posts}
    try{
        dispatch({type: POST_TYPES.LOADING_POST, payload: true})

        const res= await getDataAPI('posts', token) //? maybe you don't need to login???
        console.log(res)
        dispatch({type: POST_TYPES.GET_POSTS, 
            payload: {
                ...res.data, page: 2
            }
        })

        dispatch({type: POST_TYPES.LOADING_POST, payload: false})




    } catch(err){
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
    
}
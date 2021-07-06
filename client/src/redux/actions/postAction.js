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
export const updatePost=({content, images, auth, status})=>async(dispatch)=>{
    let media=[];
    const imgNewUrl= images.filter(img=>!img.url)
    const imgOldUrl= images.filter(img=>img.url)
    if(status.content===content&& imgNewUrl.length===0 && imgOldUrl.length===status.images.length){
        return ;
    }
    try{    
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
        if(images.length>0) media= await imageUpload(imgNewUrl)

        const res= await patchDataAPI(`/post/${status._id}`, {content, images: [...imgOldUrl, ...media]}, auth.token)
        console.log(res)
        dispatch({
            type: POST_TYPES.UPDATE_POST,
            payload: {
                ...res.data.newPost
            }
        })
        dispatch({type: GLOBALTYPES.ALERT, payload: {success: res.data.msg}})
        
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
export const likePost = ({post, auth}) => async (dispatch) => {
    const newPost = {...post, likes: [...post.likes, auth.user]}
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost})

    try{
        const like= await patchDataAPI(`post/${post._id}/like`, null, auth.token)
        console.log(like)

    }catch(err){
        dispatch({type: GLOBALTYPES.ALERT, payload:{error: err.response.data.msg}})
    }
}
export const unLikePost=({post, auth})=>async(dispatch)=>{
    const newPost= {...post, likes: post.likes.filter(like=>like._id!==auth.user._id)}
    dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})

    try{
        await patchDataAPI(`post/${post._id}/unlike`, null, auth.token)

    }catch(err){
        dispatch({type: GLOBALTYPES.ALERT, payload:{error: err.response.data.msg}})
    }
}
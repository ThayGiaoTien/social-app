import { GLOBALTYPES, EditData, DeleteData} from "./globalTypes"
import { POST_TYPES } from "./postAction"
import { postDataAPI, patchDataAPI, deleteDataAPI } from "../../utils/fetchData"
// import {createNotify, removeNotify} from '../actions/notifyAction'

export const createComment=({post, newComment, auth})=>async(dispatch)=>{
    console.log(post._id)
    const newPost= {...post, comments: [...post.comments, newComment]}
    console.log(newPost)
    
    dispatch({type: POST_TYPES.UPDATE_POST, payload:newPost})
    try{
        // The Server need newComment, postId and PostUserId to create new comment
        const data={...newComment, postId: post._id, postUserId: post.user._id }
        const res= await postDataAPI('comment', data, auth.token)   // return newComment

        const newData= {...res.data.newComment, user: auth.user}
        const newPost= {...post, comments: [...post.comments, newData]}
        dispatch({
            type: POST_TYPES.UPDATE_POST, 
            payload: newPost
        })

    } catch(err){
        dispatch(({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}}))
    }
}
export const updateComment=({comment, post, content, auth})=>async(dispatch)=>{
    const newComments=EditData(post.comments, comment._id, {...comment, content})
    const newPost= {...post, comments: newComments}
    console.log(newPost)
    dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
    try{
        await patchDataAPI(`comment/${comment._id}`, {content}, auth.token)
    } catch(err){
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}
export const likeComment=({comment, post, auth})=>async(dispatch)=>{
    const newComments= EditData(post.comments, comment._id, {...comment, likes: [...comment.likes, auth.user]})
    const newPost= {...post, comments: newComments}
    dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
    try{
        await patchDataAPI(`/comment/${comment._id}/like`, null,  auth.token )
    } catch(err){
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}
export const unLikeComment=({comment, post, auth}) =>async(dispatch)=>{
    const newComment= {...comment, likes: DeleteData(comment.likes, auth.user._id)}
    const newComments= EditData(post.comments, comment._id, newComment)
    const newPost= {...post, comments:newComments}
    dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
    try{
        await patchDataAPI(`/comment/${comment._id}/unlike`, null, auth.token)
    } catch(err){
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}
export const deleteComment=({post, auth, comment})=>async(dispatch)=>{
    // Delete all related reply comments and comment itself. 
    const deleteArr= [...post.comments.filter(cm=>cm.reply===comment._id), comment] 
    console.log(deleteArr)
    // We wrote id of parent comment in reply comment.
    const newPost= {
        ...post, 
        comments: post.comments.filter(cm=>!deleteArr.find(da=> cm._id=== da._id))
    }
    dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
    try{
        //Delete each comment in delete array.
        deleteArr.forEach(item=>{
            deleteDataAPI(`/comment/${item._id}`, auth.token)
        })
    } catch(err){
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}
import { GLOBALTYPES, EditData} from "./globalTypes"
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

}
export const deleteComment=({post, auth, comment})=>async(dispatch)=>{
    
}
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import {getPost} from '../../redux/actions/postAction'
import LoadIcon from '../../images/loading.gif'
import PostCard from '../../components/PostCard'

const Post=()=>{
    const {id}= useParams()
    const [post, setPost] = useState([])
    const {auth, detailPost}= useSelector(state=>state)
    const dispatch= useDispatch()
    
    // detailPost state still have nothing, we need to fetch data and write into it. 
    useEffect(()=>{
        dispatch(getPost({detailPost, id, auth}))
        if(detailPost.length>0){
            const thisPost= detailPost.filter(post=>post._id===id)
            setPost(thisPost)
        }
    },[detailPost, dispatch, id, auth])
    return (
        <div className='posts'>
            {
                post.length===0 && 
                <img src={LoadIcon} alt='loading' className='d-block mx-auto my-4'/>
            }
            {
                post.map(item=>(
                    <PostCard key={item._id} post={item} />
                ))
            }
        </div>
    )
}
export default Post
import React, {useState, useEffect} from 'react'

// CommentCard is used to display comment and also replyComment. So it's contain a lot of thing: 

// Avatar of user who commented, link to this user, time commented, like button, comment menu(which
//     contains update, like, unlike) and input comment field. 

import Avatar from '../../Avatar'
import {Link} from 'react-router-dom'
import moment from 'moment'
import LikeButton from '../../LikeButton'
import CommentMenu from './CommentMenu'
import {updateComment, likeComment, unLikeComment} from '../../../redux/actions/commentAction'
import InputComment from '../InputComment'

import { useSelector, useDispatch } from 'react-redux'

const CommentCard = ({children, comment, post, commentId}) => {

    const {auth, theme} =useSelector(state=>state)
    const dispatch=useDispatch()

    const [content, setContent]= useState('')
    const [readMore, setReadMore] = useState(false)

    const [onEdit, setOnEdit]= useState(false)
    const [isLike, setIsLike]= useState(false)
    const [loadLike, setLoadLike]= useState(false)

    const [onReply, setOnReply]= useState(false)
    
    // Auto update content and likes if user clicked to LikeButton
    useEffect(()=>{
        setContent(comment.content)
        setIsLike(false)
        setOnReply(false)
        if(comment.likes.find(like=> like._id===auth.user._id)){
            setIsLike(true)
        }
    }, [comment, auth.user._id])


    const handleUpdate=()=>{
        if(comment.content!==content){
            dispatch(updateComment({comment, post, content, auth}))
            setOnEdit(false)
        } else{
            setOnEdit(false)
        }
    }

    const handleLike=async()=>{
        if(loadLike) return ;
        setIsLike(true)
        setLoadLike(true)
        await dispatch(likeComment({comment, post, auth}))
        setLoadLike(false)
    }
    const handleUnLike=async()=>{
        if(loadLike) return;
        setIsLike(false)
        setLoadLike(true)
        await dispatch(unLikeComment({comment, post, auth}))
        setLoadLike(false)

    }       



    // If user replies on a reply comment, commentId is not Changed, so new reply still is a reply of root comment, not of this reply comment.
    const handleReply=()=>{                
        if(onReply) setOnReply(false)        //cancel
        setOnReply({...comment, commentId})     //reply
    }
    const styleCard={
        opacity: comment._id?1: 0.5, 
        pointerEvents: comment._id? 'inherit': 'none'
    }
    return (
        <div className='comment_card mt-2' style={styleCard}>
            <Link to={`/profile/${comment.user._id}` } className='d-flex text-dark'>
                <Avatar src={comment.user.avatar} size='small-avatar'/>
                <h6 className='mx-1' >{comment.username}</h6>
            </Link>

            <div className='comment_content'>
                <div className='flex-fill'
                style={{
                    filter: theme? 'invert(1)': 'invert(0)',
                    color: theme? 'invert(1)':'invert(0)'
                }}
                >
                    {
                        onEdit
                        ? <textarea rows='5' value={content}
                        onChange={e=>setContent(e.target.value)} />

                        :   
                        <div>
                            {
                                comment.tag && comment.tag._id !== comment.user._id &&
                                <Link to={`/profile/${comment.tag._id}`} className='mr-1'>
                                    @{comment.tag.username}
                                </Link>
                            }
                            <span>
                                {
                                    content.length<100?content:
                                    readMore? content+' ': content.slice(0,100)+ '.....'
                                }
                            </span>
                            {
                                content.length>100&&
                                <span className='readMore' onClick={()=>setReadMore(!readMore)}>
                                    {readMore? 'Hide content': 'Read more'}
                                </span>
                            }
                        </div>    
                    }

                    <div style={{cursor: 'pointer'}}>
                        <small className='text-muted mr-3'>
                            {moment(comment.createdAt).fromNow()}
                        </small>
                        
                        <small className='font-weight-bold mr-3'>
                            {comment.likes.length} likes
                        </small>
                        
                        {
                            onEdit
                            ? <>
                                <small className='font-weight-bold mr-3'
                                onClick={handleUpdate}>
                                    update
                                </small>
                                <small className='font-weight-bold mr-3'
                                onClick={()=>setOnEdit(false)}>
                                    cancel
                                </small>

                            </>
                            : <small className='font-weight-bold mr-3'
                            onClick={handleReply}>
                                {onReply?'cancel' : 'reply'}
                            </small>
                        }
                    </div>
                    
                </div>


                <div className='d-flex align-items-center mx-2' style={{cursor: 'pointer'}}>
                    <CommentMenu post={post} comment={comment} setOnEdit={setOnEdit}/>
                    <LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike} />

                </div>
            </div>  
            
           

            {
                onReply &&
                <InputComment post={post} onReply={onReply} setOnReply={setOnReply}>
                    <Link to={`/profile/${onReply.user._id}`} className='mr-1'>
                        @{onReply.user.username}: 
                    </Link>
                </InputComment>
            }
            
            { children }
        </div>
    )
}

export default CommentCard

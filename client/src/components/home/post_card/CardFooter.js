import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Send from '../../../images/send.svg'
import LikeButton from '../../LikeButton'
import { useSelector, useDispatch } from 'react-redux'
// import { likePost, unLikePost, savePost, unSavePost } from '../../../redux/actions/postAction'
// import ShareModal from '../../ShareModal'
// import { BASE_URL } from '../../../utils/config'

const CardFooter = ({post}) => {
    return (
        <div className='card_footer'>
            <div className='card_icon_menu'>
                <div>
                    <LikeButton/>
                </div>
                <Link to={`/post/${post._id}`} className="text-dark">
                        <i className="far fa-comment" />
                </Link>
                Share
            </div>

            <div className='d-flex justify-content-between'>
                <h6 style={{padding: '0 25px', cursor: 'pointer'}}>
                    {post.likes.length} likes
                </h6>

                <h6 style={{padding: '0 25px', cursor: 'pointer'}}>
                    {post.comments.length} comment
                </h6>
            </div>
            
        </div>
    )
}

export default CardFooter

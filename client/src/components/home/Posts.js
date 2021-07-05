import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PostCard from '../PostCard'

import LoadIcon from '../../images/loading.gif'
import LoadMoreBtn from '../LoadMoreBtn'

import {getDataAPI} from '../../utils/fetchData'
import {POST_TYPES} from '../../redux/actions/postAction'

const Posts = () => {
    const {homePosts, auth, theme} = useSelector(state=>state)
    console.log(homePosts)
    const dispatch=useDispatch()

    const [load, setLoad]= useState(false)

    const handleLoadMore=()=>{

    }
    return (
        <div className='posts'>
            {
                homePosts.posts.map(post=>(
                    <PostCard key={post._id} post={post} theme={theme} />
                ))
            }
            {
                load && <img src={LoadIcon} alt='loading' className='d-block mx-auto' />

            }
            
            <LoadMoreBtn result={homePosts.result} page={homePosts.page}
            load={load} handleLoadMore={handleLoadMore} />
        </div>
    )
}

export default Posts

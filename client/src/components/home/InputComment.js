import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createComment } from '../../redux/actions/commentAction'
import Icons from '../Icons'

const InputComment = ({post, children}) => {
    const[content, setContent] = useState('')

    const {auth, theme}= useSelector(state=>state)
    const dispatch= useDispatch()

    
    const handleSubmit=e=>{
        e.preventDefault()
        if(!content.trimEnd()){
            return ;
        }
        // A comment includes content, likes, user who created it, time created, reply and tag.
        const newComment={
            content, 
            likes: [],
            user: auth.user,
            createdAt: new Date().toISOString(),
           
        }

        // And post data
        dispatch(createComment({post, newComment, auth}))
        
    }
    return (
        <form className='card-footer comment_input' onSubmit={handleSubmit}>
            {children}
            <input type='text' placeholder='Add your comments...'
            value={content} onChange={e=>setContent(e.target.value)}
            style={{
                filter: theme? 'invert(1)': 'invert(0)',
                color: theme? 'invert(1)': 'invert(0)',
                background: theme? 'rgba(0,0,0,.03' :'',
            }} />

            <Icons setContent={setContent} content= {content} theme={theme}/>

            <button type='submit' className='postBtn'>
                Post
            </button>
 
        </form>
    )
}

export default InputComment

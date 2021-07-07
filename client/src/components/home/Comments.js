import React, {useState, useEffect} from 'react'
import CommentDisplay from './comments/CommentDisplay'


const Comments = ({post}) => {
    const [comments, setComments]= useState([])
    const [showComments, setShowComments]= useState([])
    const [next, setNext]= useState(2)

    const [replyComments, setReplyComments]= useState([])

    // Update comments and showComments lengths when click see more/hide. 
    useEffect(()=>{
        const newCm= post.comments.filter(cm=>!cm.reply) // create an array with all elements that passed the test.

        setComments(newCm) 
        setShowComments(newCm.slice(newCm.length-next))
    },[post.comments, next])

    return (
        <div className='comments'>

            {/* focus on this */}
            {
                showComments.map((comment, index)=>(
                    <CommentDisplay key={index} comment={comment} post={post} 
                    replyCm={replyComments.filter(item=>item.reply===comment._id)} />
                    
                ))
            }



            {
                comments.length-next>0 
                ? <div className='p-2 border-top'
                style={{ cursor: 'pointer', coloer: 'crimson'}}
                onClick={()=>setNext(next+10)}>
                    See more comments...
                </div>
                : comments.length>2 && 
                <div className='p-2 border-top' 
                style={{ cursor: 'pointer', color: 'crimson'}}
                onClick={()=>setNext(2)}>
                    Hide comments...
                   </div> 
            }
        </div>
    )
}

export default Comments

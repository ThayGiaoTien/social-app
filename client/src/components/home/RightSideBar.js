import React from 'react'
import { useSelector} from 'react-redux'

import UserCard from '../UserCard'
import FollowBtn from '../FollowBtn'
import LoadIcon from '../../images/loading.gif'



const RightSideBar = () => {
    const {auth, suggestions}= useSelector(state=>state)
    

    return (
        <div className='mt-3'>
            <UserCard user={auth.user} />

            <div className='d-flex justify-content-between align-items-center my-2'>
                <h5 className= 'text-danger'> Suggestions for you</h5>
                
            </div>

            {
                suggestions.loading 
                ? <img src={LoadIcon} alt='loading' className='d-block mx-auto my-4' />
                : <div className='suggestions'>
                    {
                        suggestions.users.map(user=>(
                            <UserCard key={user._id} user={user}>
                                <FollowBtn user={user} />
                            </UserCard>
                        ))
                    }
                </div>
            }

            <div style={{opacity: 0.5}} className=',y-2' >
                <a href='https://www.facebook.com/profile.php?id=100004119437456' target='_blank' rel='noreferrer'
                style={{wordBreak: 'break-all'}} >
                    https://www.facebook.com/profile.php?id=100004119437456
                </a>
                <small className='d-block'>
                    Welcome to teacher_forward channel! 
                </small>
                <small>
                    &copy; 2021 Teacher Forward from VietNam.
                </small>
            </div>
        </div>
    )
}

export default RightSideBar

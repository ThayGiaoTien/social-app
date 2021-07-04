import React,{useEffect} from 'react'
import Status from '../components/home/Status'
// import Posts from '../components/home/Posts'
// import RightSideBar from '../components/home/RightSideBar'

import { useSelector } from 'react-redux'
import LoadIcon from '../images/loading.gif'
let scroll=0;

const Home = () => {
    return (
        <div className='home row mx-0'>
            <div className='col-md-8'>
                <Status />

                Post

            </div>

            <div className='col-md-4'>
                <p>Right Side Bar is here.</p>
            </div>
        </div>
    )
}

export default Home

import React,{useEffect} from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'

import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'


import PageRender from './customRouters/PageRender'
import PrivateRouter from './customRouters/PrivateRender'

import Alert from './components/alert/Alert'
import Header from './components/header/Header'
import StatusModal from './components/StatusModal'

import { useSelector, useDispatch } from 'react-redux'
import { refreshToken } from './redux/actions/authAction'
import { updateProfile } from './redux/actions/profileAction'
import { getPosts } from './redux/actions/postAction'

const App = () => {
  const dispatch= useDispatch()
  const {auth, status}= useSelector(state=>state)
  
  useEffect(()=>{
    dispatch(refreshToken()) // refreshToken every time reload page
   
  },[dispatch])

  useEffect(()=>{
    if(auth.token){
      dispatch(getPosts(auth.token))

    }
  }, [dispatch, auth.token])
  
  
  return (
    <Router>
      <Alert/>
      <input type='checkbox' id='theme' />
      <div className="App"> 
        <div className='main'>
          
          {auth.token && <Header/>}
          {status && <StatusModal />}
          <Route exact path="/" component={auth.token ? Home : Login} />
          <Route exact path="/registers" component={Register} />   
           {/* i don't understand */}
          
          <PrivateRouter exact path='/:page' component={PageRender}/>
          <PrivateRouter exact path='/:page/:id' component={PageRender}/>
        </div>
      </div>
    </Router>
  )
}

export default App

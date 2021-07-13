import {useEffect} from 'react'
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
import { getPosts } from './redux/actions/postAction'
import { getSuggestions } from './redux/actions/suggestionsAction'

// Socket Io
import io from 'socket.io-client'
import { GLOBALTYPES } from './redux/actions/globalTypes'
import SocketClient from './SocketClient'

const App = () => {
  const dispatch= useDispatch()
  const {auth, status, modal}= useSelector(state=>state)
  
  // Auto refresh token  and connect to socket.io
  useEffect(()=>{
    dispatch(refreshToken()) 

    const socket= io().connect('http://localhost:5000')
    dispatch({type: GLOBALTYPES.SOCKET, payload: socket})
    return ()=> socket.close()
   
  },[dispatch])

  // Auto load data when user is logged in
  useEffect(()=>{
    if(auth.token){
      dispatch(getPosts(auth.token))
      dispatch(getSuggestions(auth.token))
    }
  }, [dispatch, auth.token])
  
  // Auto load notifications
  
  return (
    <Router>
      <Alert/>
      <input type='checkbox' id='theme' />
      <div className={`App ${(status||modal)&&'mode'}`}> 
        <div className='main'>
          
          {auth.token && <Header/>}
          {status && <StatusModal />}
          {auth.token && <SocketClient />}

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

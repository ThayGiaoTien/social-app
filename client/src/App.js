import React,{useEffect} from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import Header from './components/header/Header'
import PageRender from './customRouters/PageRender'
import PrivateRouter from './customRouters/PrivateRender'

import Alert from './components/alert/Alert'

import { useSelector, useDispatch } from 'react-redux'
import { refreshToken } from './redux/actions/authAction'
const App = () => {
  const dispatch= useDispatch()
  const {auth}= useSelector(state=>state)
  
  useEffect(()=>{
    dispatch(refreshToken())
  },[dispatch])
  return (
    <Router>
      <Alert/>
      <input type='checkbox' id='theme' />
      <div className="App"> 
        <div className='main'>
          {auth.token && <Header/>}
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

import Notfound from '../components/NotFound'
import { useSelector } from 'react-redux'
import React from 'react'
import { useParams } from 'react-router-dom'

const generatePage=(pageName)=>{
    const component= ()=>require(`../pages/${pageName}`).default //need default because it will set method render to default. If not
    //Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object.
    try{
        return React.createElement(component())
    }catch(err){
        return <Notfound/> 
    }
}
const PageRender=()=>{
    const {page, id}= useParams()
    const {auth}= useSelector(state=>state)
    let pageName=''
    if(auth.token){
        if(id){
            // return pageName=`${page}/[id]` ----This is a bug, it will render a router
            pageName=`${page}/[id]`
        }else{
            pageName=`${page}`
        }
    }
    return generatePage(pageName)

}
export default PageRender
import Notfound from '../components/NotFound'
import { useSelector } from 'react-redux'
import React from 'react'
import { useParams } from 'react-router'

const generatePage=(pageName)=>{
    const component= ()=>require(`../pages/${pageName}`)
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
            return pageName=`${page}/[id]`
        }else{
            return pageName=`${page}`
        }
    }
    return generatePage(pageName)

}
export default PageRender
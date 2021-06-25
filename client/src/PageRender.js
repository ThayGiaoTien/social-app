import React from 'react'
import { useParams } from 'react-router'
import NotFound from './components/NotFound'

const generatePage=(pageName) => {
    const component=()=>require(`./pages/${pageName}`).default
    try{
        React.createElement(component())
    }catch(err){
        return <NotFound />
    }
}

const PageRender=()=>{
    const{id, page} = useParams()
    let pageName= ''
    if(id){
        pageName=`${page}/[id]`
    } else{
        pageName=`${page}`
    }
    return generatePage(pageName)
}
export default PageRender
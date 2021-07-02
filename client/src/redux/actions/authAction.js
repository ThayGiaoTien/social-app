import {GLOBALTYPES} from './globalTypes'
import {postDataAPI} from '../../utils/fetchData'
import valid from '../../utils/valid'

export const login=(userData)=>async(dispatch)=>{
    try{
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload:{loading: true}
        })
        
        const res= await postDataAPI('login', userData)
        dispatch({
            type: GLOBALTYPES.AUTH,
            payload:{
                token: res.data.access_token,
                user: res.data.user
            }
        })
        localStorage.setItem('firstLogin', true)
        
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.msg
            }
        })
    }catch(err){
        dispatch({ 
            type: GLOBALTYPES.ALERT, 
            payload: {
                error: err.response.data.msg
            } 
        })
    }
}

export const refreshToken=()=>async(dispatch)=>{
       
    const firstLogin= localStorage.getItem('firstLogin')
    if(firstLogin) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload:{
                loading: true
            }
        })
        // Sent POST request to server to refresh token
        try{
            const res= await postDataAPI('refresh_token')
            
            dispatch({
                type: GLOBALTYPES.AUTH,
                payload: {
                    token: res.data.access_token,
                    user: res.data.user
                }
            })
            dispatch({
                type:GLOBALTYPES.ALERT,
                payload:{}
                   
            })
        }catch(err){
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload:{
                    error: err.response.data.msg
                }
            })
        }
    }
}  
export const register=(userData)=>async(dispatch)=>{
    // Create a function to to check input data
    const check= valid(userData)
    if(check.errLength>0) 
    return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: check.errMsg
    })
    try{
        dispatch({type: GLOBALTYPES.ALERT, payload:{loading: true}})
        const res= await postDataAPI('register', userData)
        console.log(res)
        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                token: res.data.access_token,
                user: res.data.user
            }
        })
        localStorage.setItem('firstLogin', true)
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.msg
            }})

    } catch(err){
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: err.response.data.msg
        }

        )
    }

}
export const logout=()=>async(dispatch)=>{
    try{
        localStorage.removeItem('firstLogin')
        await postDataAPI('logout')
        window.location.href='/'
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload:{
                message: 'Logged out successfully'
            }
        })
    }catch(err){
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}
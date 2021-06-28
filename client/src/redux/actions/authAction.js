import {GLOBALTYPES, TYPES} from './globalTypes'
import {postDataAPI} from '../../utils/fetchData'

export const login=(data)=>async(dispatch)=>{
    try{
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload:{loading: true}
        })
        
        const res= await postDataAPI('login', data)
        console.log(res);
        dispatch({
            type: GLOBALTYPES.AUTH,
            payload:{
                token: res.data.access_token,
                user: res.data.user
            }
        })
        localStorage.getItem('firstLogin', true)
        
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

import {GLOBALTYPES} from '../actions/globalTypes'
const initialState={}

const authReducer=(state=initialState, action)=>{
    switch (action.type){
        case GLOBALTYPES.AUTH:
            return action.payload  // most state changes require some data
        default:
            return state;
    }
}
export default authReducer
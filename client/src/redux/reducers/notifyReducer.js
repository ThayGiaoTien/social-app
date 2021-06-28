import { GLOBALTYPES } from "../actions/globalTypes";

const initialState={};
const notifyReducer=(state=initialState, action)=>{
    switch(action.types){
        case GLOBALTYPES.NOTIFY:
            return action.payload
        default:
            return state
    }   
}
export default notifyReducer
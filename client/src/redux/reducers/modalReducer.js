import { GLOBALTYPES } from "../actions/globalTypes";
const initialState=false
// user when on Edit or show following or show followers
const modalReducer= (state=initialState, action)=>{
    switch(action.type){
        case GLOBALTYPES.MODAL:
            return action.payload
        default:
            return state
    }
}
export default modalReducer

//A modal is a message box that is displayed on top of your screen. Modals put an overlay on the screen; 
//therefore, they take visual precedence over all the other elements.
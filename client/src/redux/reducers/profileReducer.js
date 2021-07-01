import {PROFILE_TYPES} from '../actions/profileAction'

const initialState={
    loading: false,
    ids: [],
    users:[],
    posts:[]
}
const profileReducer =(state=initialState, action)=>{
    switch(action.type){
        //Now we have 4 case
        case PROFILE_TYPES.LOADING:
            return {
                ...state,
                loading: action.payload
        }; 
        case PROFILE_TYPES.GET_USER:
            return {
                ...state, 
                users: [...state.users, action.payload.user ]
                //payload contains users return from server
                // but users contains a object {user: {...}}
                
        };
        case PROFILE_TYPES.GET_ID:
            return {
                ...state,
                ids: [...state.ids, action.payload]
        };
        case PROFILE_TYPES.GET_POSTS:
            return {
                ...state,
                posts: [...state.posts, action.payload]
        };
        default: 
            return state;
    }
}
export default profileReducer
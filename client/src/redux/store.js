//The store is what holds the application's state data and handles all state updates
//The store handles state updates by passing the current state and action
// through a single reducer


import {createStore, applyMiddleware} from 'redux' 
import {Provider} from 'react-redux' //Provider adds store to the context and update the app 
                                    //component when actions have been dispatched
import thunk from 'redux-thunk'//middleware

import rootReducer from './reducers/index'              //single reducer
import {composeWithDevTools} from 'redux-devtools-extension'

const store= createStore(
    rootReducer, 
    composeWithDevTools(applyMiddleware(thunk))
)
const DataProvider =({children})=>{
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}
export default DataProvider
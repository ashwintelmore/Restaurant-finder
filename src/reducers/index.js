import { combineReducers } from 'redux';
import TestReducers from './test.reducers'


const rootReducer =  combineReducers({
    test : TestReducers,
})


export default rootReducer;
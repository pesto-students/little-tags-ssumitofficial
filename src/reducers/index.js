import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer'

const rootReducer = combineReducers({
    sessionState: sessionReducer
});

export default rootReducer;
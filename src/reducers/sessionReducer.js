import * as ActionTypes from '../constants/ActionType';

const initialState = {
    authUser: null
}

export default function sessionReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_AUTH_USER:
            return { ...state, authUser: action.authUser };
        default:
            return state;
    }
}
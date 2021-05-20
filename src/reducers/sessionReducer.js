import * as ActionTypes from '../constants/ActionType';

const initialState = {
    authUser: null,
    cart: []
}

export default function sessionReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_AUTH_USER:
            return { ...state, authUser: action.authUser };
        case ActionTypes.SET_CART:
            return { ...state, cart: action.cart };
        default:
            return state;
    }
}
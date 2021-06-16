import React, { useReducer } from 'react'
import * as ACTIONS from '../constants/ActionType'

export const CartContext = React.createContext()

const initialState = {
    cart: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.SET_CART:
            return {...state, cart: action.cart ? action.cart : []}
        default:
            return state
    }
}

export const CartContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const setCart = (cart) => {
        dispatch({
            type: ACTIONS.SET_CART,
            cart
        });
    }

    return <CartContext.Provider value={[state.cart, setCart]}>
        {props.children}
    </CartContext.Provider>
}
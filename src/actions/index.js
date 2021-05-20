import * as ACTIONS from '../constants/ActionType';

export const setAuthUser = (authUser) => ({
    type: ACTIONS.SET_AUTH_USER,
    authUser
});

export const setCart = (cart) => ({
    type: ACTIONS.SET_CART,
    cart
});
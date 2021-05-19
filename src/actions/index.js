import { SET_AUTH_USER } from '../constants/ActionType';

export const setAuthUser = (authUser) => ({
    type: SET_AUTH_USER,
    authUser
});
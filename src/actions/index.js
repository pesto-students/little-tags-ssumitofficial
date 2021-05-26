import * as ACTIONS from '../constants/ActionType';

export const setAuthUser = (authUser) => ({
    type: ACTIONS.SET_AUTH_USER,
    authUser
});
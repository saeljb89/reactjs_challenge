import * as types from './../types';

export const loginUser = data => ({ type: types.LOGIN_USER, data });

export const logoutUser = () => ({ type: types.LOGOUT_USER });

import {
    LOGIN_USER,
    LOGOUT_USER
  } from './../types';
  
  const auth = ( state = {}, action ) => {
    switch( action.type ) {
      case LOGIN_USER:
        return { ...state, ...action.data };
      case LOGOUT_USER:
        return {};
      default:
        return state;
    }
  };

  export default auth;
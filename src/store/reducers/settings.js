import {
    TOGGLE_LOADING,
    TOGGLE_ALERT_ERROR
  } from '../types';

const initialSettings = Object.assign( {
  isLoading: false,
  errorMessage: ''
} );

const settings = ( state = initialSettings, action ) => {
  switch( action.type ) {
    case TOGGLE_LOADING:
      return { ...state, isLoading: action.isLoading };
    case TOGGLE_ALERT_ERROR:
      return { ...state, errorMessage: action.message };
    default:
      return state;
  }
};

export default settings;
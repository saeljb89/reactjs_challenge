import * as types from '../types';

export const toggleLoading = isLoading => ({ type: types.TOGGLE_LOADING, isLoading });

export const toggleAlertError = message => ({ type: types.TOGGLE_ALERT_ERROR, message });
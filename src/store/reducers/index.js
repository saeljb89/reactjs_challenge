import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import { reducer as ReduxForm } from 'redux-form';

import settings from './settings';
import user from './user';

export default combineReducers({
    routing: routerReducer,
    settings,
    user,
    form: ReduxForm
});

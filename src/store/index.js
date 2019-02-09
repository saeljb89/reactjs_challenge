import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import {loadState, saveState} from './localStorage';
import _ from 'lodash';

const persistedState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers, 
  persistedState, 
  composeEnhancers(applyMiddleware(thunk)));

store.subscribe( _.throttle( () => {
  saveState( store.getState() );
} ), 1000 );

export default store;






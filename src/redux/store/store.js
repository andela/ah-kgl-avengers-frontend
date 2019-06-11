/*
 * This is One store for our application
 * we will put the configurations of the store in this file.
 *
 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../reducers/rootReducer';

const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(thunk)));

export default store;

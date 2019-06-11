/*
* This is One store for our application
* we will put the configurations of the store in this file.
*
*/
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../reducers/rootReducer';
<<<<<<< HEAD

const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(thunk)));
=======
import initialState from '../initialState';

const state = {};
const store = createStore(reducers, state, composeWithDevTools(applyMiddleware(thunk)));
>>>>>>> feat(Read Article): A user is able to read an article

export default store;

/*
* Here will be added all the created reducers
* and combine all of them using combinedReducers
*/
import { combineReducers } from 'redux';
import welcome from './welcome';

export default combineReducers({
  welcome,
});

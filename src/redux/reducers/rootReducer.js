/*
* Here will be added all the created reducers
* and combine all of them using combinedReducers
*/
import { combineReducers } from 'redux';
import welcome from './welcome';
import registerReducer from './signup';

const reducer = combineReducers({
  welcome,
  registerReducer,
});

export default reducer;

/*
* Here will be added all the created reducers
* and combine all of them using combinedReducers
*/
import { combineReducers } from 'redux';
import registerReducer from './signup';
import user from './user';

const reducer = combineReducers({
  registerReducer,
  user,
});

export default reducer;

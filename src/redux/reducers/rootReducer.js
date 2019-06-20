/*
 * Here will be added all the created reducers
 * and combine all of them using combinedReducers
 */
import { combineReducers } from 'redux';

import registerReducer from './signup';
import user from './user';
import article from './article';

const reducer = combineReducers({
  registerReducer,
  user,
  article,
});

export default reducer;

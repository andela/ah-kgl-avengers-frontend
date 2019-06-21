/*
 *  Added all the created reducers
 * and combine them using combinedReducers
 */
import { combineReducers } from 'redux';
import user from './user';
import article from './article';

const reducer = combineReducers({
  user,
  article,
});

export default reducer;

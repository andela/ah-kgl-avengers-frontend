/*
 *  Added all the created reducers
 * and combine them using combinedReducers
 */
import { combineReducers } from 'redux';
import user from './user';
import resetPassword from './resetPassword';
import article from './article';

const reducer = combineReducers({
  resetPassword,
  user,
  article,
});

export default reducer;

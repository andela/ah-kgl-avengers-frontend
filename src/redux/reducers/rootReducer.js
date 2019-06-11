/*
* Here will be added all the created reducers
* and combine all of them using combinedReducers
*/
import { combineReducers } from 'redux';
<<<<<<< HEAD
import registerReducer from './signup';
import user from './user';

const reducer = combineReducers({
  registerReducer,
  user,
=======
import welcome from './welcome';
import readArticle from './readArticle';

export default combineReducers({
  welcome,
  readArticle,
>>>>>>> feat(Read Article): A user is able to read an article
});

export default reducer;

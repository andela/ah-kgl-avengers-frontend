/*
 * Here will be added all the created reducers
 * and combine all of them using combinedReducers
 */
import { combineReducers } from 'redux';

import registerReducer from './signup';
import user from './user';
import readArticle from './readArticle';
import article from './article';
import articles from './getArticles';
import drafts from './getDrafts';

const reducer = combineReducers({
  registerReducer,
  user,
  readArticle,
  article,
  articles,
  drafts,
});

export default reducer;

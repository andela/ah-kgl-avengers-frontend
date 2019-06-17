import initialState from '../initialState';

import {
  REDIRECT_TO,
  CREATE_ARTICLE_STARTED,
  CREATE_ARTICLE_FINISHED,
  UPDATE_ARTICLE_FAIL,
  UPDATE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_FAIL,
  DELETE_ARTICLE_SUCCESS,
} from '../action-types';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_ARTICLE_SUCCESS: {
      return { ...state, article: payload };
    }

    case UPDATE_ARTICLE_FAIL:
    case DELETE_ARTICLE_SUCCESS:
    case DELETE_ARTICLE_FAIL:
      return { ...state, message: payload };

    case CREATE_ARTICLE_STARTED:
    case CREATE_ARTICLE_FINISHED:
      return { ...state, isProgressOn: !state.isProgressOn };

    case REDIRECT_TO:
      return { ...state, redirect: payload };

    case 'EDIT_REQUEST':
      return { ...state, article: payload };

    default:
      return state;
  }
};

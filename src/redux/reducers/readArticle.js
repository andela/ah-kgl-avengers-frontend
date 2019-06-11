import {
  FETCH_ARTICLE_END,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_START,
  FETCH_ARTICLE_FAIL,
} from '../action-types';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_ARTICLE_SUCCESS:
      return {
        ...state,
        article: payload,
      };

    case FETCH_ARTICLE_START:
      return { ...state, isProgressOn: true };

    case FETCH_ARTICLE_END:
      return { ...state, isProgressOn: false };

    case FETCH_ARTICLE_FAIL:
      return { ...state, message: payload };
    default:
      return state;
  }
};

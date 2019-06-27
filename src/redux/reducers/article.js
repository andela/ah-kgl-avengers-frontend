import {
  REDIRECT_TO,
  CREATE_ARTICLE_STARTED,
  CREATE_ARTICLE_FINISHED,
  UPDATE_ARTICLE_FAIL,
  UPDATE_ARTICLE_SUCCESS,
  FETCH_ARTICLE_END,
  DELETE_ARTICLE_FAIL,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_START,
  FETCH_ARTICLE_FAIL,
  DELETE_ARTICLE_SUCCESS,
  FETCH_FEEDS_SUCCESS,
} from '../action-types';
import {
  draftSuccess,
  draftFailed,
  articleRequest,
  articleSuccess,
  articleFailed,
} from '../action-types/getArticles';
import {
  rateSuccess,
  rateFailed,
} from '../action-types/rateArticle';

import initialState from '../initialState';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_ARTICLE_SUCCESS: {
      return { ...state, editorArticle: payload };
    }

    case DELETE_ARTICLE_FAIL:
    case UPDATE_ARTICLE_FAIL:
      return { ...state, message: payload };

    case CREATE_ARTICLE_STARTED:
    case CREATE_ARTICLE_FINISHED:
      return { ...state, isProgressOn: !state.isProgressOn };

    case FETCH_FEEDS_SUCCESS:
      return {
        ...state,
        feeds: payload,
      };

    case FETCH_ARTICLE_START:
      return { ...state, isProgressOn: true };

    case FETCH_ARTICLE_END:
      return { ...state, isProgressOn: false };

    case FETCH_ARTICLE_FAIL:
      return { ...state, message: payload };

    case REDIRECT_TO:
      return { ...state, redirect: payload };
    case FETCH_ARTICLE_SUCCESS:
      return {
        ...state,
        article: payload,
        error: '',
        success: '',
      };

    case DELETE_ARTICLE_SUCCESS: {
      let newArticles = [];
      if (payload.status === 'published') {
        newArticles = state.articles.filter(item => item.slug !== payload.slug);
        return {
          ...state,
          articles: newArticles,
        };
      }
      newArticles = state.drafts.filter(item => item.slug !== payload.slug);
      return {
        ...state,
        drafts: newArticles,
      };
    }

    case 'EDIT_REQUEST':
      return { ...state, editorArticle: payload };

    case draftFailed:
      return {
        ...state,
        errors: payload,
      };

    case draftSuccess:
      return {
        ...state,
        drafts: payload,
      };

    case articleRequest:
      return {
        ...state,
        articles: payload,
      };

    case articleFailed:
      return {
        ...state,
        errors: payload,
      };

    case articleSuccess:
      return {
        ...state,
        articles: payload,
      };

    case rateFailed:
      return {
        ...state,
        error: payload.error,
        success: '',
      };

    case rateSuccess:
      return {
        ...state,
        article: {
          ...state.article,
          ratings: payload,
          totalRatings: state.article.totalRatings + 1,
        },
        success: 'Thank you for rating this article',
        error: '',
      };

    default:
      return state;
  }
};

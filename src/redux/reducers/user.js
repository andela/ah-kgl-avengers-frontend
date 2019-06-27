/*
 * The user reducer manages the whole states related to user:
 * login, signup and profile
 */

import {
  loginSuccess,
  loginFailed,
  GOOGLE_SOCIAL_ACCESS_SUCCESS,
  FACEBOOK_SOCIAL_ACCESS_SUCCESS,
  GOOGLE_SOCIAL_ACCESS_FAILED,
  FACEBOOK_SOCIAL_ACCESS_FAILED,
  RELOAD_SOCIAL_MEDIA,
} from '../action-types/user';
import {
  REGISTER_FORM_SEND,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REGISTER_LOAD,
} from '../action-types/auth';

import {
  FETCH_START,
  FETCH_END,
  FETCH_USER_FAIL,
  FETCH_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  REDIRECT_TO,
} from '../action-types';

export default (
  state = {
    register: {
      username: '',
      email: '',
      errors: [],
    },
    user: { token: '' },
    errors: [],
    isRequestOn: false,
    userArticles: [],
  },
  { type, payload },
) => {
  switch (type) {
    case FACEBOOK_SOCIAL_ACCESS_SUCCESS:
      return {
        ...state,
        facebookUser: payload,
      };
    case FACEBOOK_SOCIAL_ACCESS_FAILED:
      return {
        ...state,
        errors: payload,
      };
    case GOOGLE_SOCIAL_ACCESS_SUCCESS:
      return {
        ...state,
        googleUser: payload,
      };
    case GOOGLE_SOCIAL_ACCESS_FAILED:
      return {
        ...state,
        errors: payload,
      };
    case RELOAD_SOCIAL_MEDIA:
      return {
        ...state,
        errors: payload,
      };
    case loginSuccess:
      return {
        ...state,
        user: payload,
      };

    case loginFailed:
      return {
        ...state,
        localErrors: payload,
      };

    case REGISTER_LOAD:
    case REGISTER_FORM_SEND:
      return {
        ...state,
        submit: payload,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        message: payload.message,
        register: payload.user,
        formSend: false,
      };

    case REGISTER_FAIL:
      return {
        ...state,
        localErrors: payload.errors,
      };

    case REDIRECT_TO:
      return { ...state, redirect: payload };

    case UPDATE_USER_SUCCESS:
      return { ...state, user: payload };

    case FETCH_USER_SUCCESS:
      return { ...state, user: payload.user, userArticles: payload.articles };

    case FETCH_USER_FAIL:
    case UPDATE_USER_FAIL:
      return { ...state, errors: payload };

    case FETCH_START:
      return { ...state, isRequestOn: true };

    case FETCH_END:
      return { ...state, isRequestOn: false };

    default:
      return state;
  }
};

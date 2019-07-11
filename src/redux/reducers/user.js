/*
 * The user reducer manages the whole states related to user:
 * login, signup and profile
 */

import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  GOOGLE_SOCIAL_ACCESS_SUCCESS,
  FACEBOOK_SOCIAL_ACCESS_SUCCESS,
  GOOGLE_SOCIAL_ACCESS_FAILED,
  FACEBOOK_SOCIAL_ACCESS_FAILED,
  RELOAD_SOCIAL_MEDIA,
  FOLLOW_SUCCESS,
  UN_FOLLOW_SUCCESS,
  USER_FOLLOW_COUNT,
  USER_FOLLOWING_COUNT,
  FOLLOW_FAIL,
  UN_FOLLOW_FAIL
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
  UPDATE_PROFILE_SUCCESS,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAIL,
  UPDATE_PROFILE_FAIL,
  REDIRECT_TO,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_PROFILE,
} from '../action-types';

export default (
  state = {
    register: {
      username: '',
      email: '',
      errors: [],
    },
    user: { token: '' },
    profile: {},
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
        loggedIn: true,
        user: payload,
      };

    case FACEBOOK_SOCIAL_ACCESS_FAILED:
      return {
        ...state,
        errors: payload,
      };

    case GOOGLE_SOCIAL_ACCESS_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: payload,
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

    case FETCH_USER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: payload,
        loggedIn: true,
        localErrors: {},
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: {},
        loggedIn: false,
      };

    case LOGIN_FAILED:
      return {
        ...state,
        localErrors: payload,
      };

    case LOGOUT_FAIL:
      return { ...state, error: payload };

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

    case UPDATE_PROFILE_SUCCESS:
      return { ...state, profile: payload };

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: {},
        errors: [],
      };

    case FETCH_PROFILE_SUCCESS:
      return { ...state, profile: payload.user, userArticles: payload.articles };

    case FETCH_PROFILE_FAIL:
    case UPDATE_PROFILE_FAIL:
      return { ...state, errors: payload };

    case FETCH_USER_FAIL:
      return { ...state, loggedIn: false };

    case FETCH_START:
      return { ...state, isRequestOn: true };

    case FETCH_END:
      return { ...state, isRequestOn: false };

    case REDIRECT_TO:
      return { ...state, redirect: payload };

    case FOLLOW_SUCCESS:
      return { ...state, followedUser: payload };

    case FOLLOW_FAIL:
      return { ...state, errors: payload };
    case UN_FOLLOW_FAIL:
      return { ...state, errors: payload };
    case UN_FOLLOW_SUCCESS:
      return { ...state, message: payload };
    case USER_FOLLOW_COUNT:
      return { ...state, followers: payload };
    case USER_FOLLOWING_COUNT:
      return { ...state, following: payload };
    default:
      return state;
  }
};

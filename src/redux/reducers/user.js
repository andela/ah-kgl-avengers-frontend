/*
 * The user reducer manages the whole states related to user:
 * login, signup and profile
 */

import { loginSuccess, loginFailed } from '../action-types/user';
import {
  REGISTER_FORM_SEND,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REGISTER_LOAD,
} from '../action-types/auth';

import { REDIRECT_TO } from '../action-types';

export default (
  state = {
    register: {
      username: '',
      email: '',
      errors: [],
    },
    user: { token: '' },
    errors: [],
  },
  { type, payload },
) => {
  switch (type) {
    case loginSuccess:
      return {
        ...state,
        user: payload,
      };
    case loginFailed:
      return {
        ...state,
        errors: payload,
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
        errors: payload.errors,
      };
    case REDIRECT_TO:
      return { ...state, redirect: payload };
    default:
      return state;
  }
};

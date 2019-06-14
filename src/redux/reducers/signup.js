/* In this file there will be added the signup reducer to listen to signup actions
 * and perform some updates on state according to the actions
 */

import {
  REGISTER_FORM_SEND,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REGISTER_LOAD,
} from '../action-types/auth';
import initialState from '../initialState';

const registerReducer = (state = {register: {
    username: '',
    email: '',
    errors: [],
  }
}, action) => {
  switch (action.type) {
    case REGISTER_LOAD:
      return initialState;

    case REGISTER_FORM_SEND:
      return {
        ...state,
        submit: action.payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        register: action.payload.user,
        formSend: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        register: action.payload.errors,
      };
    default:
      return state;
  }
};

export default registerReducer;

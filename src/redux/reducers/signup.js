/* In this file there will be added the signup reducer to listen to signup actions
 * and perform some updates on state according to the actions
 */

import {
  REGISTER_INPUTS,
  REGISTER_FORM_SEND,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REGISTER_LOAD,
} from '../action-types/signup';
import initialState from '../initialState';

const registerReducer = (state = initialState.register, action) => {
  switch (action.type) {
    case REGISTER_LOAD:
      return initialState;

    case REGISTER_FORM_SEND:
      return {
        ...state,
        submit: action.payload,
      };
    case REGISTER_INPUTS:
      return {
        ...state,
        [action.payload.field]: action.payload.value,
        errors: [],
        message: '',
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        formSend: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        errors: action.payload.errors,
      };
    default:
      return state;
  }
};

export default registerReducer;

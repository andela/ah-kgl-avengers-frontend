import {
  REQUEST_RESET,
  REQUEST_RESET_SENT,
  REQUEST_RESET_FAIL,
  RESETTING_PASSWORD,
  RESET_PASS_SUCCESS,
  RESET_PASS_FAIL,
} from '../action-types/resetPassword';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_RESET:
      return {
        ...state,
      };
    case REQUEST_RESET_SENT:
      return {
        ...state,
        data: action.payload,
      };
    case REQUEST_RESET_FAIL:
      return {
        ...state,
        data: action.payload,
      };
    case RESET_PASS_FAIL:
      return {
        ...state,
        data: action.payload,
      };
    case RESETTING_PASSWORD:
      return {
        ...state,
      };
    case RESET_PASS_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

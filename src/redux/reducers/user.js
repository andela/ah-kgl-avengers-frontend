/* Here goes the simple index action creator for returning the welcoming message
 * of the Authors Haven
 */

import { loginSuccess, loginFailed } from '../action-types/user';
import initialState from '../initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case loginSuccess:
      return {
        ...state,
        user: action.payload,
      };
    case loginFailed:
      return {
        ...state,
        errors: action.payload.errors,
      };
    default:
      return state;
  }
};

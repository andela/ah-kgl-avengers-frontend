/* Here goes the simple index action creator for returning the welcoming message
 * of the Authors Haven
 */

import types from '../action-types/welcome';

export default (state = {}, action) => {
  switch (action.type) {
    case types.INDEX_ACTION:
      return {
        ...state,
        welcomeMessage: action.payload,
      };
    default:
      return state;
  }
};

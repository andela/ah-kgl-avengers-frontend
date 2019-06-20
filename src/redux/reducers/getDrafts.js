/* Here goes the simple index action creator for returning the welcoming message
 * of the Authors Haven
 */

import { draftSuccess, draftFailed } from '../action-types/getArticles';
import initialState from '../initialState';

// const initialState = {
//   articles:null
// }
export default (state = initialState, action) => {
  switch (action.type) {
    case draftFailed:
      return {
        ...state,
        errors: action.payload,
      };
    case draftSuccess:
      return {
        ...state,
        drafts: action.payload,
      };
    default:
      return state;
  }
};

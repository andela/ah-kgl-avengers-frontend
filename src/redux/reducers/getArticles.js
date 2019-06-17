/* Here goes the simple index action creator for returning the welcoming message
 * of the Authors Haven
 */

import { articleRequest, articleSuccess, articleFailed } from '../action-types/getArticles';
import initialState from '../initialState';

// const initialState = {
//   articles:null
// }
export default (state = initialState, action) => {
  switch (action.type) {
    case articleRequest:
      return {
        ...state,
        articles: action.payload,
      };
    case articleFailed:
      return {
        ...state,
        errors: action.payload,
      };
    case articleSuccess:
      return {
        ...state,
        articles: action.payload,
      };
    default:
      return state;
  }
};

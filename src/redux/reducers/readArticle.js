import types from '../action-types/readArticle';

export default (state = {}, action) => {
  switch (action.type) {
    case types:
      return {
        ...state,
        payload: action.payload,
      };
    default:
      return state;
  }
};

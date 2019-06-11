import axios from 'axios';
import { optRequest } from '../../helpers/config';
import {
  FETCH_ARTICLE_END,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_START,
  FETCH_ARTICLE_FAIL,
} from '../action-types';

const readArticle = id => (dispatch) => {
  const url = `${process.env.REACT_APP_API}/articles/${id}`;
  dispatch({ type: FETCH_ARTICLE_START, payload: {} });
  return axios
    .get(url, optRequest)
    .then((response) => {
      const { article } = response.data;
      return dispatch({ type: FETCH_ARTICLE_SUCCESS, payload: article });
    })
    .catch((error) => {
      const { errors } = error.response;
      return dispatch({ type: FETCH_ARTICLE_FAIL, payload: { text: errors, type: 'error' } });
    })
    .finally(() => {
      dispatch({ type: FETCH_ARTICLE_END, payload: {} });
    });
};

export default readArticle;

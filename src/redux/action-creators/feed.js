import axios from 'axios';
// import { optRequest } from '../../helpers/config';
import {
  FETCH_ARTICLE_END,
  FETCH_FEEDS_SUCCESS,
  FETCH_ARTICLE_START,
  FETCH_ARTICLE_FAIL,
} from '../action-types';

const fetchFeeds = () => (dispatch) => {
  const url = `${process.env.REACT_APP_API}/articles/feeds`;
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    Object.defineProperty(headers, 'Authorization', {
      value: `Bearer ${localStorage.getItem('token')}`,
    });
  }

  dispatch({ type: FETCH_ARTICLE_START, payload: {} });
  axios
    .get(url, {})
    .then((response) => {
      const { articles } = response.data;
      const articleLength = articles.length;
      const mainArticle = articles[0];
      let secondary = [];
      let trending = [];

      if (articleLength >= 6) {
        trending = Array.from({ length: 6 }, (value, index) => articles[index + 1]);
      } else {
        trending = Array.from({ length: articleLength - 1 }, (value, index) => articles[index + 1]);
        secondary = Array.from(
          { length: articleLength - 1 },
          (value, index) => articles[index + 1],
        );
      }
      if (articleLength > 6) {
        secondary = Array.from(
          { length: articleLength - 7 },
          (value, index) => articles[index + 7],
        );
      }
      return dispatch({
        type: FETCH_FEEDS_SUCCESS,
        payload: {
          main: mainArticle,
          secondary,
          trending,
        },
      });
    })
    .catch((error) => {
      const { errors } = error.response;
      return dispatch({ type: FETCH_ARTICLE_FAIL, payload: { text: errors, type: 'error' } });
    })
    .finally(() => dispatch({ type: FETCH_ARTICLE_END, payload: {} }));
};

export default fetchFeeds;

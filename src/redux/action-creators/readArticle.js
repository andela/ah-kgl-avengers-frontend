import axios from 'axios';
import { optRequest } from '../../helpers/config';
import {
  FETCH_ARTICLE_END,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_START,
  FETCH_ARTICLE_FAIL,
} from '../action-types';

const readArticle = slug => async (dispatch) => {
  const url = `https://ah-kg-avengers-backend-staging.herokuapp.com/api/v1/articles/${slug}`;
  const ratingUrl = `https://ah-kg-avengers-backend-staging.herokuapp.com/api/v1/articles/${slug}/ratings`;
  dispatch({ type: FETCH_ARTICLE_START, payload: {} });
  try {
    const resp = await axios.get(url, optRequest);
    const { article } = resp.data;
    const ratings = await axios.get(ratingUrl, optRequest);
    let { totalRatings } = ratings.data;
    if (!totalRatings) {
      totalRatings = 0;
    }
    article.totalRatings = totalRatings;
    return dispatch({ type: FETCH_ARTICLE_SUCCESS, payload: article });
  } catch (error) {
    const { errors } = error.response;
    return dispatch({ type: FETCH_ARTICLE_FAIL, payload: { text: errors, type: 'error' } });
  } finally {
    dispatch({ type: FETCH_ARTICLE_END, payload: {} });
  }
};
export default readArticle;

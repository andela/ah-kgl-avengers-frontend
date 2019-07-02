import axios from 'axios';
import { optRequest } from '../../helpers/config';
import {
  FETCH_ARTICLE_END,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_START,
  FETCH_ARTICLE_FAIL,
  LIKE_ARTICLE,
  DISLIKE_ARTICLE,
  FETCH_AGAIN_LIKES,
} from '../action-types';

export const readArticle = slug => async (dispatch) => {
  const url = `${process.env.REACT_APP_API}/articles/${slug}`;
  const ratingUrl = `${process.env.REACT_APP_API}/articles/${slug}/ratings`;
  dispatch({ type: FETCH_ARTICLE_START, payload: {} });
  try {
    const resp = await axios.get(url, optRequest);
    const { article } = resp.data;
    let totalRatings;
    try {
      const ratings = await axios.get(ratingUrl, optRequest);
      totalRatings = ratings.data.totalRatings;
    } catch (error) {
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

export const likeArticle = slug => async (dispatch) => {
  const url = `${process.env.REACT_APP_API}/articles/${slug}/like`;
  const fetchAgain = `${process.env.REACT_APP_API}/articles/${slug}`;
  try {
    const makeRequest = await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          Accept: 'application/json',
        },
      },
    );
    const likedArticle = await axios.get(fetchAgain, optRequest);
    dispatch({ type: LIKE_ARTICLE, payload: makeRequest });
    dispatch({ type: FETCH_AGAIN_LIKES, payload: likedArticle });
  } catch (errors) {
    return errors;
  }
};

export const dislikeArticle = slug => async (dispatch) => {
  const url = `${process.env.REACT_APP_API}/articles/${slug}/dislike`;
  const fetchAgain = `${process.env.REACT_APP_API}/articles/${slug}`;

  try {
    const makeRequest = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    const likedArticle = await axios.get(fetchAgain, optRequest);
    dispatch({ type: DISLIKE_ARTICLE, payload: makeRequest });
    dispatch({ type: FETCH_AGAIN_LIKES, payload: likedArticle });
  } catch (errors) {
    return errors;
  }
};

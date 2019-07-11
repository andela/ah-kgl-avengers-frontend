import axios from 'axios';
import { objectProperty } from '@babel/types';
import { optRequest } from '../../helpers/config';
import {
  FETCH_ARTICLE_END,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_START,
  FETCH_ARTICLE_FAIL,
  LIKE_ARTICLE,
  DISLIKE_ARTICLE,
  FETCH_AGAIN_LIKES,
  LIKE_ARTICLE_FAIL,
  RESET_ARTICLE,
  CLEAR_ARTICLE,
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_SUCCESS,
  LIKE_COMMENT_SUCCESS,
  DISLIKE_COMMENT_SUCCESS,
  LIKE_COMMENT_FAIL,
} from '../action-types';

export const readArticle = slug => async (dispatch) => {
  const url = `${process.env.REACT_APP_API}/articles/${slug}`;
  const ratingUrl = `${process.env.REACT_APP_API}/articles/${slug}/ratings`;
  const commentURL = `${process.env.REACT_APP_API}/articles/${slug}/comments`;
  dispatch({ type: FETCH_ARTICLE_START, payload: {} });
  try {
    const resp = await axios.get(url, optRequest);
    const { article } = resp.data;
    let totalRatings;
    let comments = [];
    try {
      const { data } = await axios.get(commentURL, optRequest);
      comments = data.comments;
    } catch (error) {
      comments = [];
    }
    try {
      const ratings = await axios.get(ratingUrl, optRequest());
      totalRatings = ratings.data.totalRatings;
    } catch (error) {
      totalRatings = 0;
    }
    Object.defineProperties(article, {
      comments: { value: comments, enumerable: true },
      totalRatings: { value: totalRatings, enumerable: true },
    });
    return dispatch({ type: FETCH_ARTICLE_SUCCESS, payload: article });
  } catch (error) {
    const { errors } = error.response;
    return dispatch({ type: FETCH_ARTICLE_FAIL, payload: { text: errors, type: 'error' } });
  } finally {
    dispatch({ type: FETCH_ARTICLE_END, payload: {} });
  }
};

export const resetArticle = () => (dispatch) => {
  dispatch({ type: RESET_ARTICLE, payload: {} });
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
    const likedArticle = await axios.get(fetchAgain, optRequest());
    dispatch({ type: LIKE_ARTICLE, payload: makeRequest });
    dispatch({ type: FETCH_AGAIN_LIKES, payload: likedArticle });
  } catch (errors) {
    dispatch({ type: LIKE_ARTICLE_FAIL, payload: errors.response.data });
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
    const likedArticle = await axios.get(fetchAgain, optRequest());
    dispatch({ type: DISLIKE_ARTICLE, payload: makeRequest });
    dispatch({ type: FETCH_AGAIN_LIKES, payload: likedArticle });
  } catch (errors) {
    dispatch({ type: LIKE_ARTICLE_FAIL, payload: errors.response.data });
    return errors;
  }
};

export const createComment = ({ slug, body }) => async (dispatch) => {
  const commentURL = `${process.env.REACT_APP_API}/articles/${slug}/comments`;
  try {
    const { data } = await axios.post(commentURL, { body }, optRequest());
    const { comment } = data;
    const user = JSON.parse(localStorage.getItem('user'));
    Object.defineProperties(comment, {
      author: { value: user, enumerable: true },
      likes: { value: 0, enumerable: true, writable: true },
    });
    dispatch({ type: CREATE_COMMENT_SUCCESS, payload: comment });
  } catch (error) {
    dispatch({ type: CREATE_COMMENT_FAIL, payload: 'comment failed' });
  }
};

export const likeComment = ({ commentId }) => async (dispatch) => {
  const URL = `${process.env.REACT_APP_API}/articles/comments/${commentId}/like`;
  try {
    const { data } = await axios.post(URL, {}, optRequest());
    const { message } = data;
    if (!message.includes('removed')) {
      dispatch({ type: LIKE_COMMENT_SUCCESS, payload: { id: commentId } });
    } else dispatch({ type: DISLIKE_COMMENT_SUCCESS, payload: { id: commentId } });
  } catch (error) {
    const { data } = error;
    dispatch({ type: LIKE_COMMENT_FAIL, payload: data.error || data });
  }
};

export const clearArticle = () => dispatch => dispatch({ type: CLEAR_ARTICLE, payload: {} });

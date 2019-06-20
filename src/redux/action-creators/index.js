import Axios from 'axios';
import {
  CREATE_ARTICLE_STARTED,
  CREATE_ARTICLE_FINISHED,
  UPDATE_ARTICLE_FAIL,
  UPDATE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_FAIL,
  DELETE_ARTICLE_SUCCESS,
  REDIRECT_TO,
} from '../action-types';

const axios = Axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: { 'Content-Type': 'application/json' },
});

export function saveArticle({ article: data, token }) {
  return dispatch => new Promise((resolve, reject) => {
    token = localStorage.getItem('token');
    if (data.body === '') {
      return resolve(
        dispatch({
          type: UPDATE_ARTICLE_FAIL,
          payload: { text: 'Body is empty', type: 'error' },
        }),
      );
    }
    if (data.title === '') {
      return resolve(
        dispatch({
          type: UPDATE_ARTICLE_FAIL,
          payload: { text: 'Title is empty', type: 'error' },
        }),
      );
    }
    dispatch({ type: CREATE_ARTICLE_STARTED, payload: {} });

    const url = data.slug ? `/articles/${data.slug}` : '/articles';
    const method = data.slug ? 'put' : 'post';
    const formatedData = data.slug
      ? {
        title: data.title,
        body: data.body,
        status: data.status,
        tagList: data.tagList,
      }
      : data;

    return resolve(
      axios({
        method,
        url,
        data: formatedData,
        headers: { authorization: `Bearer ${token}` },
      })
        .then((response) => {
          const { article } = response.data;
          if (data.status && data.status === 'published') {
            dispatch({ type: REDIRECT_TO, payload: { to: `/articles/${article.slug}` } });
          }
          return dispatch({
            type: UPDATE_ARTICLE_SUCCESS,
            payload: article,
          });
        })
        .catch((error) => {
          const { data: response } = error.response;
          return dispatch({
            type: UPDATE_ARTICLE_FAIL,
            payload: { text: response.errors || ['Failed to save article'], type: 'error' },
          });
        })
        .finally(() => {
          dispatch({ type: CREATE_ARTICLE_FINISHED, payload: {} });
        }),
    );
  });
}


export const deleteArticle = (slug, status) => async (dispatch) => {
  const url = `/articles/${slug}`;
  const token = localStorage.getItem('token');
  try {
    await axios.delete(url, {
      headers: { authorization: `Bearer ${token}` },
    });
    return dispatch({ type: DELETE_ARTICLE_SUCCESS, payload: { slug, status } });
  } catch (error) {
    return dispatch({
      type: DELETE_ARTICLE_FAIL,
      payload: { message: 'Failed to delete article!' },
    });
  }
};

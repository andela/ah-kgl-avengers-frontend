import axios from 'axios';
import {
  CREATE_ARTICLE_STARTED,
  CREATE_ARTICLE_FINISHED,
  UPDATE_ARTICLE_FAIL,
  UPDATE_ARTICLE_SUCCESS,
  REDIRECT_TO,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_FAIL,
  CLEAR_EDITOR,
} from '../action-types';

export const saveArticle = ({ article: data }) => dispatch => new Promise((resolve, reject) => {
  const token = localStorage.getItem('token');
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

  // the first image in the body is the featured image of the article
  // each image is a child of the figure element and is followed by a figcaption element
  const featuredImage = data.body
    .substring(data.body.search(/(src=")/g), data.body.search(/("><figcaption>)|("><\/figure>)/g))
    .substring(5);

  const url = data.slug ? `/articles/${data.slug}` : '/articles';
  const method = data.slug ? 'put' : 'post';
  const formatedData = data.slug
    ? {
      title: data.title,
      body: data.body,
      status: data.status,
      tagList: data.tagList,
      featuredImage,
    }
    : { ...data, featuredImage };

  return resolve(
    axios[`${method}`](`${process.env.REACT_APP_API}${url}`, formatedData, {
      headers: { authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    })
      .then((response) => {
        const { article } = response.data;
        if (data.status && data.status === 'published') {
          dispatch({ type: REDIRECT_TO, payload: { to: `/articles/${article.slug}` } });
        }
        dispatch({
          type: UPDATE_ARTICLE_SUCCESS,
          payload: article,
        });
      })
      .catch((error) => {
        const { data: response } = error.response;
        dispatch({
          type: UPDATE_ARTICLE_FAIL,
          payload: { text: response.errors || ['Failed to save article'], type: 'error' },
        });
      })
      .finally(() => {
        dispatch({ type: CREATE_ARTICLE_FINISHED, payload: {} });
      }),
  );
});

export const deleteArticle = (slug, status) => async (dispatch) => {
  const url = `${process.env.REACT_APP_API}/articles/${slug}`;
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

export const clearEditor = () => dispatch => dispatch({ type: CLEAR_EDITOR, payload: {} });

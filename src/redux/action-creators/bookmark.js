import Axios from 'axios';
import { optRequest, actionDispatch } from '../../helpers/config';
import {
  BOOKMARK_SEND,
  BOOKMARK_SUCCESS,
  BOOKMARK_FAIL,
  BOOKMARK_GET_ALL_FAIL,
  BOOKMARK_GET_ALL,
  BOOKMARK_DELETE,
  BOOKMARK_DELETE_FAIL,
  BOOKMARK_DELETE_SUCCESS,
} from '../action-types/bookmark';

export const bookmarkArticle = slug => async (dispatch) => {
  const url = `${process.env.REACT_APP_API}/bookmarks/${slug}`;
  dispatch(actionDispatch(BOOKMARK_SEND));
  try {
    console.log(optRequest);
    const { data } = await Axios.post(url, null, optRequest);
    return dispatch(actionDispatch(BOOKMARK_SUCCESS, data.message));
  } catch (error) {
    const { error: message } = error.response.data;
    return dispatch(actionDispatch(BOOKMARK_FAIL, message));
  }
};

export const getAllBookmarks = () => async (dispatch) => {
  const url = `${process.env.REACT_APP_API}/bookmarks`;
  try {
    const { data } = await Axios.get(url, optRequest);
    return dispatch(actionDispatch(BOOKMARK_GET_ALL, data));
  } catch (error) {
    const { message } = error.response.data;
    return dispatch(actionDispatch(BOOKMARK_GET_ALL_FAIL, message));
  }
};

export const removeBookmark = slug => async (dispatch) => {
  const url = `${process.env.REACT_APP_API}/bookmarks/${slug}`;
  dispatch(actionDispatch(BOOKMARK_DELETE));
  try {
    await Axios.delete(url, optRequest);
    return dispatch(actionDispatch(BOOKMARK_DELETE_SUCCESS, slug));
  } catch (error) {
    const { message } = error.response.data;
    return dispatch(actionDispatch(BOOKMARK_DELETE_FAIL, message));
  }
};

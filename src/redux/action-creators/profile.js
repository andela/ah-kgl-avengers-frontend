import axios from 'axios';

import {
  FETCH_START,
  FETCH_END,
  FETCH_PROFILE_FAIL,
  FETCH_PROFILE_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
} from '../action-types';

/**
 *
 * @param {string} username
 * get user data and user published articles
 * create  FETCH_USER_SUCCESS action
 */
export const getUser = username => async (dispatch) => {
  // get the token from the store
  const token = localStorage.getItem('token');
  dispatch({ type: FETCH_START, payload: {} });
  try {
    const userRequest = await axios.get(
      `https://ah-kg-avengers-backend-staging.herokuapp.com/api/v1/users/profile/${username}`,
      {
        headers: { authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      },
    );
    const { profile } = userRequest.data;
    let articles = [];

    // get all published articles
    const userArticles = await axios.get(
      `https://ah-kg-avengers-backend-staging.herokuapp.com/api/v1/user/${username}/articles`,
      {
        headers: { authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      },
    );
    if (userArticles.status === 200) {
      articles = userArticles.data.data;
    }
    return dispatch({ type: FETCH_PROFILE_SUCCESS, payload: { user: profile, articles } });
  } catch (error) {
    const { data } = error.response;
    return dispatch({ type: FETCH_PROFILE_FAIL, payload: data.error || 'user not found' });
  } finally {
    dispatch({ type: FETCH_END, payload: {} });
  }
};

/**
 *
 * @param {string} username
 * updates the logged in user, the token and data is required to updated the profile
 */
export const updateUser = ({ username, data }) => async (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch({ type: FETCH_START, payload: {} });
  try {
    const updateRequest = await axios.put(
      `https://ah-kg-avengers-backend-staging.herokuapp.com/api/v1/users/profile/${username}/update`,
      data,
      {
        headers: { authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      },
    );
    const { profile } = updateRequest.data;
    return dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: { ...profile } });
  } catch (error) {
    const { errors } = error;
    return dispatch({ type: UPDATE_PROFILE_FAIL, payload: errors || 'user not found' });
  } finally {
    dispatch({ type: FETCH_END, payload: {} });
  }
};

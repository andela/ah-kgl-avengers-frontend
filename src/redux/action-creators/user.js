/*
 * Here goes the simple index reducer for returning the welcoming message
 * of the Authors Haven
 */
import axios from 'axios';
import { actionDispatch, optRequest } from '../../helpers/config';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  GOOGLE_SOCIAL_ACCESS_SUCCESS,
  FACEBOOK_SOCIAL_ACCESS_SUCCESS,
  GOOGLE_SOCIAL_ACCESS_FAILED,
  FACEBOOK_SOCIAL_ACCESS_FAILED,
  RELOAD_SOCIAL_MEDIA,
  USER_FOLLOW_COUNT,
  USER_FOLLOWING_COUNT,
  FOLLOW_SUCCESS,
  UN_FOLLOW_SUCCESS,
  FOLLOW_FAIL,
  UN_FOLLOW_FAIL,
} from '../action-types/user';
import {
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  REDIRECT_TO,
  CLEAR_PROFILE,
} from '../action-types';

export const loadUser = () => (dispatch) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return dispatch(actionDispatch(FETCH_USER_FAIL, {}));
  }
  let user = localStorage.getItem('user');
  user = user ? JSON.parse(user) : {};

  if (!Object.prototype.hasOwnProperty.call(user, 'token')) {
    Object.defineProperty(user, 'token', { value: token });
  }
  return dispatch(actionDispatch(FETCH_USER_SUCCESS, user));
};

export const userLogin = user => async (dispatch) => {
  const url = `${process.env.REACT_APP_API}/auth/login`;

  return axios
    .post(url, user, { })
    .then((response) => {
      // dispatch the action and pass the payload
      const { user: userData } = response.data;
      const { token } = userData;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      dispatch(actionDispatch(LOGIN_SUCCESS, response.data.user));
    })
    .catch((error) => {
      // handle error
      dispatch(
        actionDispatch(
          LOGIN_FAILED,
          (error.response.data.error && [error.response.data.error]) || error.response.data.errors,
        ),
      );
    });
};

export const googleSocialAccess = accessToken => async (dispatch) => {
  const url = `${process.env.REACT_APP_API}/oauth/google`;
  try {
    const googleAccess = await axios.post(
      url,
      { access_token: accessToken },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );
    const { token, data, message } = googleAccess.data;
    const googleLocalStorage = { ...data };
    const googleData = { ...data, message };
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(googleLocalStorage));
    return dispatch({ type: GOOGLE_SOCIAL_ACCESS_SUCCESS, payload: googleData });
  } catch (error) {
    const { data } = error.response;
    return dispatch({ type: GOOGLE_SOCIAL_ACCESS_FAILED, payload: data });
  }
};

export const facebookSocialAccess = accessToken => async (dispatch) => {
  const url = `${process.env.REACT_APP_API}/oauth/facebook`;
  try {
    const facebookAccess = await axios.post(
      url,
      { access_token: accessToken },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );
    const { token, data, message } = facebookAccess.data;
    const facebookLocalStorage = { ...data };
    const facebookData = { ...data, message };
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(facebookLocalStorage));
    return dispatch({ type: FACEBOOK_SOCIAL_ACCESS_SUCCESS, payload: facebookData });
  } catch (error) {
    const { data } = error.response;
    return dispatch({ type: FACEBOOK_SOCIAL_ACCESS_FAILED, payload: data });
  }
};

export const removeErrorMessage = () => async (dispatch) => {
  dispatch({ type: RELOAD_SOCIAL_MEDIA, payload: {} });
};

/**
 * @param {string} location
 * clear user token in local storage
 * call the backend to blacklist the token
 * if the user was on a page that is authenticated, redirect to the homepage
 * use the location parameter to check if the user should be redirected
 */
export const logoutUser = ({ location }) => async (dispatch) => {
  const url = `${process.env.REACT_APP_API}/auth/logout`;
  const token = localStorage.getItem('token');
  let shouldRedirect;

  // switch through predefined redirect location cases
  switch (location) {
    case '/:username/edit':
    case 'my-articles':
      shouldRedirect = true;
      break;
    default:
      shouldRedirect = false;
      break;
  }

  try {
    await axios.post(url, null, {
      headers: { authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    });
    localStorage.clear('token');
    localStorage.clear('user');
    dispatch({ type: LOGOUT_SUCCESS, payload: {} });

    if (shouldRedirect) {
      dispatch({ type: REDIRECT_TO, payload: { to: '/' } });
    }
  } catch (error) {
    const { response } = error;
    const message = response.data.errors || 'failed to logout, tyr again';
    return dispatch({ type: LOGOUT_FAIL, payload: message });
  }
};

export const getFollowers = username => async (dispatch) => {
  const url = `${process.env.REACT_APP_API}/profile/${username}/followers`;

  try {
    const getFollowersCount = await axios.get(url);
    return dispatch({ type: USER_FOLLOW_COUNT, payload: getFollowersCount });
  } catch (error) {
    return error;
  }
};

export const getFollowing = username => async (dispatch) => {
  const url = `${process.env.REACT_APP_API}/profile/${username}/following`;

  try {
    const getFollowersCount = await axios.get(url);

    return dispatch({ type: USER_FOLLOWING_COUNT, payload: getFollowersCount });
  } catch (error) {
    return error;
  }
};

export const follow = username => async (dispatch) => {
  const url = `${process.env.REACT_APP_API}/profiles/${username.username}/follow`;

  try {
    const followUser = await axios.post(url, {}, optRequest());
    return dispatch({ type: FOLLOW_SUCCESS, payload: followUser });
  } catch (error) {
    dispatch({ type: FOLLOW_FAIL, payload: error.response.data });
    return error;
  }
};

export const unFollow = username => async (dispatch) => {
  const url = `${process.env.REACT_APP_API}/profiles/${username.username}/follow`;

  try {
    const followUser = await axios.delete(url, optRequest());
    return dispatch({ type: UN_FOLLOW_SUCCESS, payload: followUser });
  } catch (error) {
    dispatch({ type: UN_FOLLOW_FAIL, payload: error.response.data });
    return error;
  }
};

export const clearProfile = () => dispatch => dispatch({ type: CLEAR_PROFILE, payload: {} });

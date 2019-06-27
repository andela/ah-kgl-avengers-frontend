/*
 * Here goes the simple index reducer for returning the welcoming message
 * of the Authors Haven
 */
import axios from 'axios';
import { actionDispatch } from '../../helpers/config';
import {
  loginSuccess,
  loginFailed,
  GOOGLE_SOCIAL_ACCESS_SUCCESS,
  FACEBOOK_SOCIAL_ACCESS_SUCCESS,
  GOOGLE_SOCIAL_ACCESS_FAILED,
  FACEBOOK_SOCIAL_ACCESS_FAILED,
  RELOAD_SOCIAL_MEDIA,
} from '../action-types/user';

export const userLogin = user => async (dispatch) => {
  const url = `${process.env.REACT_APP_API}/auth/login`;

  return axios
    .post(url, user)
    .then((response) => {
      // dispatch the action and pass the payload
      const { token } = response.data.user;
      localStorage.setItem('token', token);
      dispatch(actionDispatch(loginSuccess, response.data.user));
    })
    .catch((error) => {
      // handle error
      dispatch(
        actionDispatch(
          loginFailed,
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
    const googleData = { ...data, message };
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(googleData));
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
    const facebookData = { ...data, message };
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(facebookData));
    return dispatch({ type: FACEBOOK_SOCIAL_ACCESS_SUCCESS, payload: facebookData });
  } catch (error) {
    const { data } = error.response;
    return dispatch({ type: FACEBOOK_SOCIAL_ACCESS_FAILED, payload: data });
  }
};

export const removeErrorMessage = () => async (dispatch) => {
  dispatch({ type: RELOAD_SOCIAL_MEDIA, payload: {} });
};

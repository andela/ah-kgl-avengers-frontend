/*
 * The action creators of the signup functionalities will be added here.
 *
 */
import Axios from 'axios';
import {
  REGISTER_FORM_SEND,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REGISTER_LOAD,
} from '../action-types/auth';

import { REDIRECT_TO } from '../action-types';

// the action creator for handling the register form submit
export const registerFormSend = payload => ({
  type: REGISTER_FORM_SEND,
  payload,
});

// the action creator for the register success
export const registerSuccess = payload => ({
  type: REGISTER_SUCCESS,
  payload,
});

// the action creator for the register fail
export const registerFail = payload => ({
  type: REGISTER_FAIL,
  payload,
});

// clearing the register waiting for the request to be processed
export const registerLoad = () => ({
  type: REGISTER_LOAD,
});

// the actual action creator for the user register
export const userRegister = data => async (dispatch) => {
  dispatch(registerFormSend({ formSend: true }));
  const url = process.env.REACT_APP_API;
  try {
    // make a call on the API with provided headers
    const makeRequest = await Axios.post(`${url}/auth/signup`, data);

    /*
    * Incase the response returned has status from 200 or 201
    * then dispatch the register success and return user object.
    */
    dispatch(registerLoad());
    return dispatch(registerSuccess(makeRequest.data));
  } catch (error) {
    /*
    * Incase the response returned has status different from 200 or 201
    * then dispatch the register fail and return error that are coming from the server
    */
    dispatch(registerFail({ errors: error.response.data.errors }));
    return error;
  }
};

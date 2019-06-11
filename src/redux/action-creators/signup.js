/*
* The action creators of the signup functionalities will be added here.
*
*/
import Axios from 'axios';
import {
  REGISTER_INPUTS,
  REGISTER_FORM_SEND,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REGISTER_LOAD,
} from '../action-types/signup';
import { optRequest, actionDispatch } from '../../helpers/config';

// the action creator which return the action object of data and type
export const registerInput = data => ({
  type: REGISTER_INPUTS,
  payload: data,
});

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
    const makeRequest = await Axios.post(`${url}/api/v1/auth/signup`, data);
    return dispatch(registerSuccess(makeRequest.data));
  } catch (error) {
    dispatch(registerFail({ message: error.message }));
    return error;
  }
};

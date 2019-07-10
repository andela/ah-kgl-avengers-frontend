import Axios from 'axios';
import { optRequest, actionDispatch } from '../../helpers/config';
import {
  REQUEST_RESET,
  REQUEST_RESET_SENT,
  REQUEST_RESET_FAIL,
  RESETTING_PASSWORD,
  RESET_PASS_SUCCESS,
  RESET_PASS_FAIL,
} from '../action-types/resetPassword';

export const requestReset = email => async (dispatch) => {
  const url = `${process.env.REACT_APP_API}/auth/reset`;
  dispatch(actionDispatch(REQUEST_RESET));
  try {
    const { data } = await Axios.post(url, email, optRequest());
    return dispatch(actionDispatch(REQUEST_RESET_SENT, data));
  } catch (error) {
    return dispatch(actionDispatch(REQUEST_RESET_FAIL, error.response.data));
  }
};

export const changePassword = params => async (dispatch) => {
  const { token, body } = params;
  const url = `${process.env.REACT_APP_API}/auth/reset/${token}`;
  dispatch(actionDispatch(RESETTING_PASSWORD));
  try {
    const { data } = await Axios.put(url, body, optRequest());
    return dispatch(actionDispatch(RESET_PASS_SUCCESS, data));
  } catch (error) {
    return dispatch(actionDispatch(RESET_PASS_FAIL, error.response.data));
  }
};

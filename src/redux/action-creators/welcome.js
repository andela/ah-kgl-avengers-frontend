/*
 * Here goes the simple index reducer for returning the welcoming message
 * of the Authors Haven
 */
import Axios from 'axios';
import { optRequest, actionDispatch } from '../../helpers/config';
import types from '../action-types/welcome';

const welcome = () => async (dispatch) => {
  // get the url from .env file
  const url = process.env.REACT_APP_API;
  try {
    // make a call on the API with provided headers
    const makeRequest = await Axios.get(url, optRequest);
    // dispatch the action and pass the payload
    return dispatch(actionDispatch(types.INDEX_ACTION, makeRequest.data));
  } catch (error) {
    return error;
  }
};

export default welcome;

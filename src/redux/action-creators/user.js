/*
 * Here goes the simple index reducer for returning the welcoming message
 * of the Authors Haven
 */
import Axios from 'axios';
import { actionDispatch } from '../../helpers/config';
import { loginSuccess, loginFailed } from '../action-types/user';

const userLogin = user => async (dispatch) => {
  const url = `${process.env.REACT_APP_API}/auth/login`;
  Axios.post(url, user)
    .then((response) => {
      // dispatch the action and pass the payload
      dispatch(actionDispatch(loginSuccess, response.data.user));
    })
    .catch((error) => {
      // handle error
      dispatch(actionDispatch(loginFailed, error.response.data));
    });
};

export default userLogin;

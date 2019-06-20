import axios from 'axios';
import { actionDispatch, optRequest } from '../../helpers/config';
import { articleRequest, articleSuccess, articleFailed } from '../action-types/getArticles';

const getArticles = () => (dispatch) => {
  const url = `${process.env.REACT_APP_API}/articles`;
  dispatch(actionDispatch(articleRequest));
  return axios
    .get(url, optRequest)
    .then((response) => {
      const { articles } = response.data;
      dispatch(actionDispatch(articleSuccess, articles));
    })
    .catch((error) => {
      // handle error
      dispatch(actionDispatch(articleFailed, error.response.data));
    });
};

export default getArticles;

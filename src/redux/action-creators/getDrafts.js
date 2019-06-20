import axios from 'axios';
import { actionDispatch, optRequest } from '../../helpers/config';
import { draftRequest, draftSuccess, draftFailed } from '../action-types/getArticles';

const getDrafts = () => (dispatch) => {
  const url = `${process.env.REACT_APP_API}/articles/draft`;
  dispatch(actionDispatch(draftRequest));
  return axios
    .get(url, optRequest)
    .then((response) => {
      const { articles } = response.data;
      dispatch(actionDispatch(draftSuccess, articles));
    })
    .catch((error) => {
      // handle error
      dispatch(actionDispatch(draftFailed, error.response.data));
    });
};

export default getDrafts;

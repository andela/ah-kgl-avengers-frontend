import axios from 'axios';
import { actionDispatch, optRequest } from '../../helpers/config';
import { rateRequest, rateSuccess, rateFailed } from '../action-types/rateArticle';

const rateArticle = (value, slug) => (dispatch) => {
  const url = `${process.env.REACT_APP_API}/articles/${slug}/ratings`;
  dispatch(actionDispatch(rateRequest));
  return axios
    .post(url, value, optRequest())
    .then((response) => {
      const { averageRating } = response.data;
      dispatch(actionDispatch(rateSuccess, averageRating));
    })
    .catch((error) => {
      // handle error
      dispatch(actionDispatch(rateFailed, error.response.data));
    });
};

export default rateArticle;

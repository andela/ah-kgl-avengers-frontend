import axios from 'axios';
import { actionDispatch, optRequest } from '../../helpers/config';
import { articleRequest, articleSuccess, articleFailed } from '../action-types/getArticles';

const getArticles = () => async (dispatch) => {
  const url = `${process.env.REACT_APP_API}/articles`;
  dispatch(actionDispatch(articleRequest));

  try {
    const request = await axios.get(url, optRequest);
    const { articles } = request.data;
    return dispatch(actionDispatch(articleSuccess, articles));
  } catch (error) {
    // handle error
    return dispatch(actionDispatch(articleFailed, error.response.data));
  }
};

export default getArticles;

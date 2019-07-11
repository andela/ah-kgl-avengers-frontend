import axios from 'axios';
import { actionDispatch } from '../../helpers/config';
import { draftRequest, draftSuccess, draftFailed } from '../action-types/getArticles';

const getDrafts = () => async (dispatch) => {
  const url = `${process.env.REACT_APP_API}/articles/draft`;
  dispatch(actionDispatch(draftRequest));

  try {
    const request = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const { articles } = request.data;
    return dispatch(actionDispatch(draftSuccess, articles));
  } catch (error) {
    // handle error
    return dispatch(actionDispatch(draftFailed, error.response.data));
  }
};

export default getDrafts;

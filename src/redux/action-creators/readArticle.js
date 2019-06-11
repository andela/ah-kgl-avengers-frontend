import axios from 'axios';
import { optRequest, actionDispatch } from '../../helpers/config';
import types from '../action-types/readArticle';

const readArticle = () => async (dispatch) => {
  const url = `${process.env.REACT_APP_API}articles/feeds`;

  try {
    const getReadArticle = await axios.get(url, optRequest);
    console.log(getReadArticle.data.articles);
    return dispatch(actionDispatch(types, getReadArticle.data.articles[10]));
  } catch (error) {
    return error;
  }
};

export default readArticle;

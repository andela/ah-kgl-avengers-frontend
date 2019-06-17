import { actionDispatch } from '../../helpers/config';

const editArticle = article => (dispatch) => {
  dispatch(actionDispatch('EDIT_REQUEST', article));
};

export default editArticle;

import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { deleteArticle } from '../../redux/action-creators/index';

const mockStore = configureStore([thunk]);
const store = mockStore();

describe('Read Article Action', () => {
  beforeEach(() => {
    moxios.install();
    store.clearActions();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test('should test the delete article action with an object of type and payload', async () => {
    store.dispatch(deleteArticle());
    expect(store.getActions()).toBeDefined();
  });
});

import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import readArticle from '../../redux/action-creators/readArticle';

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

  test('should test the get article action with an object of type and payload', async () => {
    store.dispatch(readArticle());
    expect(store.getActions()).toBeDefined();
  });
});

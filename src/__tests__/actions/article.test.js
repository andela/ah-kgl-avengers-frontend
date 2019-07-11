import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { clearEditor } from '../../redux/action-creators/index';

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

  test('should dispatch clear editor action', () => {
    store.dispatch(clearEditor());
    expect(store.getActions()).toEqual([{ type: 'CLEAR_EDITOR', payload: {} }]);
  });
});

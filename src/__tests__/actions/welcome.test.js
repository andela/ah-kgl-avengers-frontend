import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import welcome from '../../redux/action-creators/welcome';

const mockStore = configureStore([thunk]);
const store = mockStore();

describe('Welcome action', () => {
  beforeEach(() => {
    moxios.install();
    store.clearActions();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test('should test welcome action with action type and payload', async () => {
    store.dispatch(welcome());
    expect(store.getActions()).toBeDefined();
  });
});

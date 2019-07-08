import axios from 'axios';
import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { userLogin, logoutUser } from '../../redux/action-creators/user';

const mockStore = configureStore([thunk]);
const store = mockStore();

// mock the local storage function
const localStorage = {};
Object.defineProperty(global, 'localStorage', {
  value: {
    setItem: (key, value) => Object.assign(localStorage, { [key]: value }),
    getItem: key => localStorage[key] || undefined,
  },
});

describe('LOGIN actions', () => {
  beforeEach(() => {
    moxios.install(axios);
    store.clearActions();
  });
  afterEach(() => {
    moxios.uninstall(axios);
  });

  test('Should login the user', () => {
    const userData = {
      username: 'avengers',
      email: 'avengers@andela.com',
      password: 'avengers1234',
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { user: { token: 'hgfdsfghjk', ...userData } },
      });
    });
    return store.dispatch(userLogin(userData)).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });

  test('Should dispatch login failed action', () => {
    const userData = {
      username: 'avengers',
      email: 'avengers@andela.com',
      password: 'avengers1234',
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response: { data: { error: 'user with that email not found' } },
      });
    });
    return store.dispatch(userLogin(userData)).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });

  test('should dispatch LOGOUT_SUCCESS', () => {
    const location = '/';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 200,
        response: { data: { message: 'user logged out' } },
      });
    });
    return store.dispatch(logoutUser({ location })).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });

  test('should dispatch LOGOUT_SUCCESS and REDIRECT_TO', () => {
    const location = '/:username/edit';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 200,
        response: { data: { message: 'user logged out' } },
      });
    });
    return store.dispatch(logoutUser({ location })).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });

  test('should dispatch LOGOUT_FAIL', () => {
    const location = '/';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response: { data: { errors: 'user logged out' } },
      });
    });
    return store.dispatch(logoutUser({ location })).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });
});

import axios from 'axios';
import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  requestReset,
  changePassword
} from '../../redux/action-creators/resetPassword';

const mockStore = configureStore([thunk]);
const store = mockStore({});

describe('Reset password action creator', () => {
  beforeEach(() => {
    moxios.install(axios);
    store.clearActions();
  });

  afterEach(() => {
    moxios.uninstall(axios);
  });

  test('Request to reset password and success', () => {
    const email = 'test@test.com';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { data: { status: 200 } },
      });
    });
    return store.dispatch(requestReset(email)).then((res) => {
      expect(res.payload.data.status).toBe(200);
    });
  });

  test('Request to reset password but fail', () => {
    const email = 'test@test.com';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response: { data: { status: 400 } },
      });
    });
    return store.dispatch(requestReset(email)).then((error) => {
      expect(error.payload.status).toBe(400);
    });
  });

  test('Update password when request accepted', () => {
    const params = {
      token: 'ejanndhskspsjWHANSJ',
      body: {
        password: '12345678',
        password1: '12345678',
      },
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { data: { status: 200 } },
      });
    });
    return store.dispatch(changePassword(params)).then((res) => {
      expect(res.payload.data.status).toBe(200);
    });
  });

  test('Fail to update password when data are not valid', () => {
    const params = {
      token: 'ejanndhskspsjWHANSJ',
      body: {
        password: '12345678',
        password1: '12345679',
      },
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response: { data: { status: 400 } },
      });
    });
    return store.dispatch(changePassword(params)).then((error) => {
      expect(error.payload.status).toBe(400);
    });
  });
});

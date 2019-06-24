import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  registerFormSend, registerFail, registerSuccess, userRegister,
} from '../../redux/action-creators/signup';
import { REGISTER_FORM_SEND, REGISTER_FAIL, REGISTER_SUCCESS } from '../../redux/action-types/auth';

const mockStore = configureStore([thunk]);
const store = mockStore();

describe('Signup actions', () => {
  beforeEach(() => {
    moxios.install();
    store.clearActions();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test('should dispatch REGISTER_FORM_SEND action', () => {
    const payload = { formSend: true };
    const expectedPayload = {
      type: REGISTER_FORM_SEND,
      payload,
    };

    store.dispatch(registerFormSend(payload));

    const actions = store.getActions();
    expect(actions).toEqual([expectedPayload]);
  });

  test('should dispatch REGISTER_FAIL action', () => {
    const payload = { data: {} };
    const expectedPayload = {
      type: REGISTER_FAIL,
      payload,
    };

    store.dispatch(registerFail(payload));

    const actions = store.getActions();
    expect(actions).toEqual([expectedPayload]);
  });

  test('should dispatch REGISTER_SUCCESS action', () => {
    const payload = { data: {} };
    const expectedPayload = {
      type: REGISTER_SUCCESS,
      payload,
    };

    store.dispatch(registerSuccess(payload));

    const actions = store.getActions();
    expect(actions).toEqual([expectedPayload]);
  });

  test('Should create the user', () => {
    const userData = {
      username: 'avengers',
      email: 'avengers@andela.com',
      password: 'avengers1234',
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        message: 'user created',
      });
    });
    return store.dispatch(userRegister(userData)).then((res) => {
      expect(res.type).toEqual('REGISTER_SUCCESS');
      expect(store.getActions().length).toBe(3);
    });
  });

  test('Should fail to create the user', () => {
    const userData = {
      username: 'avengers',
      email: 'avengers@andela.com',
      password: 'avengers1234',
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response: { data: { errors: ['Some error occurs'] } },
      });
    });
    return store.dispatch(userRegister(userData)).then((error) => {
      expect(error.status).toEqual(400);
    });
  });
});

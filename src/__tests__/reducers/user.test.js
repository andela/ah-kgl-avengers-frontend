import reducer from '../../redux/reducers/user';
import { REDIRECT_TO } from '../../redux/action-types';
import {
  REGISTER_FORM_SEND,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REGISTER_LOAD,
} from '../../redux/action-types/auth';
import { loginSuccess, loginFailed } from '../../redux/action-types/user';

const state = {
  register: {
    username: '',
    email: '',
    errors: [],
  },
  user: { token: '' },
  errors: [],
};

describe('Article Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(state, {})).toEqual(state);
  });
  it('should add the user object to the state', () => {
    expect(reducer(state, { type: loginSuccess, payload: { token: '' } })).toEqual({
      ...state,
      user: { token: '' },
    });
  });

  it('should add login errors to the state', () => {
    expect(reducer(state, { type: loginFailed, payload: [] })).toEqual({ ...state, errors: [] });
  });

  it('should handle the REGISTER_LOAD &  REGISTER_FORM_SEND actions', () => {
    expect(reducer(state, { type: REGISTER_LOAD, payload: {} })).toEqual({ ...state, submit: {} });
    expect(reducer(state, { type: REGISTER_FORM_SEND, payload: {} })).toEqual({
      ...state,
      submit: {},
    });
  });

  it('should add the register user object to the state', () => {
    expect(
      reducer(state, {
        type: REGISTER_SUCCESS,
        payload: {
          message: 'user created',
          user: { token: '' },
        },
      }),
    ).toEqual({
      ...state,
      message: 'user created',
      register: { token: '' },
      formSend: false,
    });
  });

  it('should add register errors to the state', () => {
    expect(reducer(state, { type: REGISTER_FAIL, payload: { errors: [] } })).toEqual({
      ...state,
      errors: [],
    });
  });

  it('should add the redirect object into the state', () => {
    expect(reducer(state, { type: REDIRECT_TO, payload: { to: '/some-page' } })).toEqual({
      ...state,
      redirect: { to: '/some-page' },
    });
  });
});

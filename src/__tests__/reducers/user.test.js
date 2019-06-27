import reducer from '../../redux/reducers/user';
import {
  REGISTER_FORM_SEND,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REGISTER_LOAD,
} from '../../redux/action-types/auth';
import {
  FETCH_START,
  FETCH_END,
  FETCH_USER_FAIL,
  FETCH_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  FETCH_FOLLOWERS_FAIL,
  FETCH_FOLLOWERS_SUCCESS,
  REDIRECT_TO,
} from '../../redux/action-types';
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
    expect(reducer(state, { type: loginFailed, payload: [] })).toEqual({
      ...state,
      localErrors: [],
    });
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
      localErrors: [],
    });
  });

  it('should add the redirect object into the state', () => {
    expect(reducer(state, { type: REDIRECT_TO, payload: { to: '/some-page' } })).toEqual({
      ...state,
      redirect: { to: '/some-page' },
    });
  });

  it('should update the user after updating the profile', () => {
    expect(reducer(state, { type: UPDATE_USER_SUCCESS, payload: {} })).toEqual({
      ...state,
      user: {},
    });
  });

  it('should add an error after UPDATE_FAIL', () => {
    expect(reducer(state, { type: UPDATE_USER_FAIL, payload: 'user not found' })).toEqual({
      ...state,
      errors: 'user not found',
    });
  });

  it('should update the user object after FETCH_USER', () => {
    expect(
      reducer(state, { type: FETCH_USER_SUCCESS, payload: { user: {}, articles: {} } }),
    ).toEqual({ ...state, user: {}, userArticles: {} });
  });

  it('should add an error after FETCH_USER fail', () => {
    expect(reducer(state, { type: FETCH_USER_FAIL, payload: 'user not found' })).toEqual({
      ...state,
      errors: 'user not found',
    });
  });

  it('should change isRequestOn to true', () => {
    expect(reducer(state, { type: FETCH_START, payload: {} })).toEqual({
      ...state,
      isRequestOn: true,
    });
  });
  it('should change isRequestOn to false ', () => {
    expect(reducer(state, { type: FETCH_END, payload: {} })).toEqual({
      ...state,
      isRequestOn: false,
    });
  });
});

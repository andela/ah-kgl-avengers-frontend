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
  FETCH_PROFILE_FAIL,
  FETCH_PROFILE_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  REDIRECT_TO,
  LOGOUT_SUCCESS,
} from '../../redux/action-types';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  FACEBOOK_SOCIAL_ACCESS_FAILED,
  FACEBOOK_SOCIAL_ACCESS_SUCCESS,
  RELOAD_SOCIAL_MEDIA,
  GOOGLE_SOCIAL_ACCESS_FAILED,
  GOOGLE_SOCIAL_ACCESS_SUCCESS,
} from '../../redux/action-types/user';

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
    expect(reducer(state, { type: LOGIN_SUCCESS, payload: { token: '' } })).toEqual({
      ...state,
      user: { token: '' },
      loggedIn: true,
      localErrors: {},
    });
  });

  it('should add the user object to the state', () => {
    expect(
      reducer(state, { type: FACEBOOK_SOCIAL_ACCESS_SUCCESS, payload: { token: '' } }),
    ).toEqual({
      ...state,
      user: { token: '' },
      loggedIn: true,
    });
  });

  it('should add the user object to the state', () => {
    expect(reducer(state, { type: GOOGLE_SOCIAL_ACCESS_SUCCESS, payload: { token: '' } })).toEqual({
      ...state,
      user: { token: '' },
      loggedIn: true,
    });
  });

  it('should empty the user object', () => {
    expect(reducer(state, { type: LOGOUT_SUCCESS, payload: {} })).toEqual({
      ...state,
      user: {},
      loggedIn: false,
    });
  });

  it('should add login errors to the state', () => {
    expect(reducer(state, { type: LOGIN_FAILED, payload: [] })).toEqual({
      ...state,
      localErrors: [],
    });
  });

  it('should add login errors to the state', () => {
    expect(reducer(state, { type: RELOAD_SOCIAL_MEDIA, payload: [] })).toEqual({
      ...state,
      errors: [],
    });
  });

  it('should add login errors to the state', () => {
    expect(reducer(state, { type: FACEBOOK_SOCIAL_ACCESS_FAILED, payload: [] })).toEqual({
      ...state,
      errors: [],
    });
  });

  it('should add login errors to the state', () => {
    expect(reducer(state, { type: GOOGLE_SOCIAL_ACCESS_FAILED, payload: [] })).toEqual({
      ...state,
      errors: [],
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
    expect(reducer(state, { type: UPDATE_PROFILE_SUCCESS, payload: {} })).toEqual({
      ...state,
      profile: {},
    });
  });

  it('should add an error after UPDATE_FAIL', () => {
    expect(reducer(state, { type: UPDATE_PROFILE_FAIL, payload: 'user not found' })).toEqual({
      ...state,
      errors: 'user not found',
    });
  });

  it('should update the user object after FETCH_USER', () => {
    expect(
      reducer(state, { type: FETCH_PROFILE_SUCCESS, payload: { user: {}, articles: {} } }),
    ).toEqual({ ...state, profile: {}, userArticles: {} });
  });

  it('should add an error after FETCH_USER fail', () => {
    expect(reducer(state, { type: FETCH_PROFILE_FAIL, payload: 'user not found' })).toEqual({
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

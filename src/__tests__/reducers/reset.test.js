import reducer from '../../redux/reducers/resetPassword';

import {
  REQUEST_RESET,
  REQUEST_RESET_SENT,
  REQUEST_RESET_FAIL,
  RESETTING_PASSWORD,
  RESET_PASS_SUCCESS,
  RESET_PASS_FAIL,
} from '../../redux/action-types/resetPassword';

const state = {
  register: {
    username: '',
    email: '',
    errors: [],
  },
  user: { token: '' },
  errors: [],
};

describe('', () => {
  it('', () => {
    expect(reducer(state, { type: REQUEST_RESET, payload: {} })).toEqual(state);
  });
  it('', () => {
    expect(reducer(state, { type: RESETTING_PASSWORD, payload: {} })).toEqual(state);
  });
  it('', () => {
    expect(reducer(state, { type: REQUEST_RESET_SENT, payload: {} })).toEqual({
      ...state,
      data: {},
    });
  });
  it('', () => {
    expect(reducer(state, { type: REQUEST_RESET_FAIL, payload: {} })).toEqual({
      ...state,
      data: {},
    });
  });
  it('', () => {
    expect(reducer(state, { type: RESET_PASS_SUCCESS, payload: {} })).toEqual({
      ...state,
      data: {},
    });
  });
  it('', () => {
    expect(reducer(state, { type: RESET_PASS_FAIL, payload: {} })).toEqual({ ...state, data: {} });
  });
});

import reducer from '../../redux/reducers/welcome';
import store from '../../redux/store/store';
import {
  REGISTER_FORM_SEND,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REGISTER_LOAD,
} from '../../redux/action-types/auth';

describe('Welcome Reducer', () => {
  // test the state
  it('should return the initial `state`', () => {
    const resp = {
      email: '',
      errors: [],
      username: '',
    };
    expect(reducer(resp, {})).toEqual(store.getState().register);
  });

  test('should handle CLEAR_FORGOT_PASSWORD_FORM', () => {
    const resp = {
      email: '',
      errors: [],
      username: '',
    };
    const expectedState = {
      type: REGISTER_LOAD,
    };
    expect(reducer(resp, expectedState)).toEqual(store.getState().register);
  });
});

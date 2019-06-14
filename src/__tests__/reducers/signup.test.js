import reducer from '../../redux/reducers/signup';
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
    expect(reducer({}, { register: {
      username: '',
      email: '',
      errors: [],
      }
    })).toEqual({});
  });
});

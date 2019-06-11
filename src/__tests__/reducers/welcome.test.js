import reducer from '../../redux/reducers/welcome';
import types from '../../redux/action-types/welcome';
import store from '../../redux/store/store';

describe('Welcome Reducer', () => {
  // // test the state
  // it('should return the initial `state`', () => {
  //   expect(reducer(undefined, {})).toEqual(store.getState().article);
  // });

  // test the reducer to handle the action type
  it('should handle `INDEX_ACTION`', () => {
    const expectedState = {
      type: types.INDEX_ACTION,
    };
    expect(reducer({}, expectedState)).toEqual({});
  });
});

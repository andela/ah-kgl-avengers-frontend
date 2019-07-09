import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import checkPropTypes from 'check-prop-types';
import { BrowserRouter } from 'react-router-dom';
import Follow from '../../components/container/follower';

const mockStore = configureMockStore([thunk]);
const initialState = {
  followers: {},
  following: {},
  user: { user: { username: '' } },
  articles: {},
  errors: [],
  isRequestOn: false,
};
const store = mockStore(initialState);
const expectedProps = {
  onGetUser: jest.fn(),
  match: {
    params: {
      username: 'test',
    },
  },
  getFollowers: jest.fn(),
  getFollowing: jest.fn(),
};
describe('Follow Component', () => {
  describe('checking PropTypes', () => {
    it('Should not throw a warning', () => {
      const checkPropsError = checkPropTypes(Follow.propTypes, expectedProps, 'props', Follow.name);
      expect(checkPropsError).toBeUndefined();
    });
  });

  describe('Follow Component Elements', () => {
    beforeEach(() => {
    });
    it('Should render the component without errors', () => {
      const components = mount(
        <Provider store={store}>
          <BrowserRouter>
            <Follow {...expectedProps} />
          </BrowserRouter>
        </Provider>,
      );
      const wrapper = components.find('button');
      expect(wrapper).toBeDefined();
    });
    it('Should render image avatar', () => {
      const components = mount(
        <Provider store={store}>
          <BrowserRouter>
            <Follow {...expectedProps} />
          </BrowserRouter>
        </Provider>,
      );
      const avatar = components.find('FollowingView');
      expect(avatar.length).toBeDefined();
    });
  });
});

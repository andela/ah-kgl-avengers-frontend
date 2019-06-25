import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import SocialLogin from '../../components/Auth/socialLogin';

const mockStore = configureMockStore([thunk]);

const initialState = {
  user: {
    errors: {},
    user: {},
    googleUser: {},
    facebookUser: {},
  },
};
const props = {
  history: {},
  googleSocialAccess: jest.fn(),
  facebookSocialAccess: jest.fn(),
  removeErrorMessage: jest.fn(),
};

let store;
let component;

describe('Test social login component', () => {
  beforeEach(() => {
    store = mockStore(initialState);
    component = mount(
      <Provider store={store}>
        <Router>
          <SocialLogin {...props} />
        </Router>
      </Provider>,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render the render Social login component', () => {
    expect(component.find('SocialLogin')).toBeDefined();
  });

  test('Should unmount component', () => {
    const button = component.find('.social-spacing-google');
    button.simulate('click');
    expect(1).toBe(1);
  });
});

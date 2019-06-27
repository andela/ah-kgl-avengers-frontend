import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { Register } from '../../components/Auth/Signup';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  user: {
    errors: [],
    register: {
      email: '',
      password: '',
      username: '',
    },
  },
});
const mockFn = jest.fn();

const props = {
  registerSubmit: jest.fn().mockImplementation(() => Promise.resolve({ status: 201 })),
  onInputChange: mockFn,
  history: { push: mockFn },
};

const defaultState = {
  username: '',
  emailError: 'Email is not Valid',
  password: '',
  passwordError: 'Password is Required',
  email: '',
  usernameError: 'Username is Required',
  hidden: true,
};
describe('<Register />', () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  const component = shallow(<Register {...props} />);
  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
  test('should render <Register />', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <Register {...props} />
        </Router>
      </Provider>,
    );
    expect(wrapper.find('Register')).toBeDefined();
  });

  test('should call registerSubmit', () => {
    const wrapper = shallow(<Register {...props} />);
    const fakeEvent = { preventDefault: () => {} };
    wrapper.find('.sign-up-btn').simulate('click', fakeEvent);
    expect(wrapper.state()).toEqual({
      ...defaultState,
    });
  });

  test('should call registerSubmit', () => {
    const wrapper = shallow(<Register {...props} />);
    const fakeEvent = { preventDefault: () => {} };
    wrapper.find('.btn-toggle-password').simulate('click', fakeEvent);
    expect(wrapper.state()).toEqual({
      email: '',
      hidden: false,
      password: '',
      username: '',
    });
  });
});

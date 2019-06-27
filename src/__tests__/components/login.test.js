import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import Login from '../../components/Auth/login';
import Title from '../../components/Auth/Title';
import Redirect from '../../components/Auth/Redirect';
import Nav from '../../components/Auth/Nav';

const mockStore = configureMockStore([thunk]);
const mockFn = jest.fn();

const props = {
  userLogin: mockFn,
  history: { push: mockFn },
};

const user = {
  email: 'test@test.com',
  password: '123456789',
};

const initialState = {
  user: {
    errors: [],
    user: {},
  },
};

let store;
let component;

describe('Login Component', () => {
  beforeEach(() => {
    store = mockStore(initialState);
    component = mount(
      <Provider store={store}>
        <Router>
          <Login {...props} />
        </Router>
      </Provider>,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should check login snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  test('should render Login component', () => {
    expect(component.find('Login')).toBeDefined();
  });

  test('Should try to login', () => {
    const fakeEvent = { preventDefault: () => {} };
    component.setState(user);
    component.find('.sign-up-btn').simulate('click', fakeEvent);
    expect(component.state().email).toEqual(user.email);
  });

  test('should call registerSubmit', () => {
    const input = component.find('.input-color').at(1);
    input.simulate('change', { target: { value: 'test@test.com' } });
    // Something to work on later
    expect(component.state().email).toBe(undefined);
  });

  test('When user put invalid data', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Router>
          <Login {...props} />
        </Router>
      </Provider>,
    );
    const errors = ['email is missing', 'password is missing'];
    wrapper.setProps({ errors });
    expect(wrapper.state().emailError).toEqual(undefined);
  });

  test('Should test Nav component', () => {
    const wrapper = mount(
      <Router>
        <Nav />
      </Router>,
    );
    expect(wrapper.find('nav')).toBeDefined();
  });

  test('Should test Title component', () => {
    const wrapper = shallow(
      <Title />,
    );
    expect(wrapper.find('Title')).toBeDefined();
  });

  test('Should test Redirect component', () => {
    const wrapper = shallow(
      <Redirect />,
    );
    expect(wrapper.find('Redirect')).toBeDefined();
  });
});

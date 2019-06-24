import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import RequestReset from '../../components/container/requestReset';

const initialState = {
  reset: {},
};

const mockStore = configureMockStore([thunk]);

const props = {
  requestReset: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  history: {},
};

let store;
let wrapper;

describe('Testing reset password', () => {
  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <RequestReset {... props} />
        </Router>
      </Provider>,
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should create RequestReset snapshot', () => {
    const component = shallow(
      <Provider store={store}>
        <Router>
          <RequestReset {... props} />
        </Router>
      </Provider>,
    );
    expect(component).toMatchSnapshot();
  });

  it('Should render RequestReset component', () => {
    expect(wrapper.find('ResetPassword')).toBeDefined();
  });

  it('Should check component props', () => {
    expect(wrapper.find('ResetPassword').props().requestReset).toBeDefined();
    expect(wrapper.find('ResetPassword').props().history).toBeDefined();
  });

  it('Should handle form submit event', () => {
    const form = wrapper.find('Form');
    form.simulate('submit');
    expect(form).toBeDefined();
  });

  it('Should send reset password request', () => {
    wrapper.setState({ email: 'test@test.com' });
    const button = wrapper.find('Button');
    button.simulate('click');
    expect(wrapper.state().email).toBe('test@test.com');
  });

  it('Should toggle modal', () => {
    wrapper.find('Modal').props().toggle();
    expect(wrapper.find('Modal')).toBeDefined();
  });

  it('Should handle input change', () => {
    const input = wrapper.find('Input');
    input.simulate('change');
    expect(wrapper.find('Input')).toBeDefined();
  });
});

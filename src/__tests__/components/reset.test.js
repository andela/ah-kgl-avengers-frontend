import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import RequestReset from '../../components/container/requestReset';
import UpdatePassword from '../../components/container/updatePassword';

const mockStore = configureMockStore([thunk]);
const store = mockStore({});

const resetProps = {
  requestReset: jest.fn(),
  history: {},
};

const updateProps = {
  changePassword: jest.fn(),
  match: {},
  history: {},
};

describe('Testing reset password', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const resetComponent = shallow(
    <Provider store={store}>
      <Router>
        <RequestReset {... resetProps} />
      </Router>
    </Provider>,
  );

  const updateComponent = shallow(
    <Provider store={store}>
      <Router>
        <UpdatePassword {... updateProps} />
      </Router>
    </Provider>,
  );

  it('Should create RequestReset snapshot', () => {
    expect(resetComponent).toMatchSnapshot();
  });

  it('Should render RequestReset component', () => {
    const div = document.createElement('div');
    ReactDOM.render(resetComponent, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Should check component props', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <RequestReset {... resetProps} />
        </Router>
      </Provider>,
    );
    expect(wrapper.find('ResetPassword').props().requestReset).toBeDefined();
    expect(wrapper.find('ResetPassword').props().history).toBeDefined();
  });

  it('Should request reset password', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <RequestReset {... resetProps} />
        </Router>
      </Provider>,
    );
    const button = wrapper.find('button').at(0);
    await button.simulate('click');
    expect(wrapper.state().email).toEqual(undefined);
  });

  it('Should create UpdatePassword snapshot', () => {
    expect(updateComponent).toMatchSnapshot();
  });

  it('Should render UpdatePassword component', () => {
    const div = document.createElement('div');
    ReactDOM.render(updateComponent, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Should check component props', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <UpdatePassword {... updateProps} />
        </Router>
      </Provider>,
    );
    expect(wrapper.find('UpdatePassword').props().changePassword).toBeDefined();
    expect(wrapper.find('UpdatePassword').props().history).toBeDefined();
    expect(wrapper.find('UpdatePassword').props().match).toBeDefined();
  });

  it('Should update password', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <UpdatePassword {... updateProps} />
        </Router>
      </Provider>,
    );
    const button = wrapper.find('button').at(0);
    await button.simulate('click');
    expect(wrapper.state().email).toEqual(undefined);
  });
});

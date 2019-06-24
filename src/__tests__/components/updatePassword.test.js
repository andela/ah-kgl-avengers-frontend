import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import UpdatePassword from '../../components/container/updatePassword';

const mockStore = configureMockStore([thunk]);
const store = mockStore({});

const updateProps = {
  changePassword: jest.fn(),
  match: {},
  history: {},
};
let wrapper;
describe('Testing reset password', () => {
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <UpdatePassword {... updateProps} />
        </Router>
      </Provider>,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should create UpdatePassword snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render UpdatePassword component', () => {
    expect(wrapper.find('UpdatePassword')).toBeDefined();
  });

  it('Should check component props', () => {
    expect(wrapper.find('UpdatePassword').props().changePassword).toBeDefined();
    expect(wrapper.find('UpdatePassword').props().history).toBeDefined();
    expect(wrapper.find('UpdatePassword').props().match).toBeDefined();
  });

  it('Should update password', async () => {
    const button = wrapper.find('button').at(0);
    await button.simulate('click');
    expect(wrapper.state().email).toEqual(undefined);
  });

  it('Should handle input change', () => {
    const input = wrapper.find('Input').at(0);
    input.simulate('change');
    expect(wrapper.find('Input')).toBeDefined();
  });

  it('Should handle form submit event', () => {
    const form = wrapper.find('Form');
    form.simulate('submit');
    expect(form).toBeDefined();
  });
});

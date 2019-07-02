import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from '../app';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  user: {
    loggedIn: false,
  },
});

const props = {
  onLoadUser: jest.fn(),
};

describe('<App />', () => {
  test('Should render the App', () => {
    const routes = shallow(
      <Provider store={store}>
        <App {...props} />
      </Provider>,
    );
    expect(routes).toMatchSnapshot();
  });
});

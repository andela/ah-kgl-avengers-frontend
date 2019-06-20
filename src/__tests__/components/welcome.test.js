import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Welcome from '../../components/container/Welcome';

const mockStore = configureMockStore([thunk]);
const store = mockStore({});

const props = {
  welcome: jest.fn(),
  response: jest.fn(),
};
describe('<Welcome />', () => {
  beforeEach(() => {
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  const component = shallow(
    <Provider store={store}>
      <Welcome {...props} />
    </Provider>,
  );
  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
  test('should render <Welcome />', () => {
    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <Welcome />
        </Provider>
,
      </BrowserRouter>,
    );
    expect(wrapper.find('Welcome')).toBeDefined();
  });
});

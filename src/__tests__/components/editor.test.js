import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Editor from '../../components/editor/editor';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  user: {
    loggedIn: true,
    user: {
      username: 'user',
    },
  },
  article: {
    article: {},
    message: {},
    isProgressOn: false,
  },
});

const props = {
  onSaveArticle: jest.fn(),
};

// mock for mutations observer window object
global.MutationObserver = class {
  constructor() {}

  disconnect() {}

  observe() {}
};

describe('<Editor />', () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });
  const component = shallow(
    <Provider store={store}>
      <Editor {...props} />
    </Provider>,
  );

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });

  it('Should render the component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <Editor />
        </Router>
      </Provider>,
    );
    expect(wrapper.find('Editor')).toBeDefined();
  });
});

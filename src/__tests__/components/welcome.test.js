import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Welcome from '../../components/container/Welcome';

const initialState = {
  user: {
    user: {
      username: 'user',
    },
  },
  article: {
    feeds: {
      main: {
        title: 'Mock title',
        slug: 'mock-title',
        body: 'Body o',
        readTime: '2 min',
        author: 'ABC',
        createdAt: '2019-06-21T08:13:05.567Z',
        tagList: ['test', 'jest'],
      },
      trending: [
        {
          title: 'Mock title',
          slug: 'mock-title1',
          body: 'Body o',
          readTime: '2 min',
          author: 'ABC',
          createdAt: '2019-06-21T08:13:05.567Z',
          tagList: ['test', 'jest'],
        },
      ],
      secondary: [
        {
          title: 'Mock title',
          slug: 'mock-title1',
          body: 'Body o',
          readTime: '2 min',
          author: 'ABC',
          createdAt: '2019-06-21T08:13:05.567Z',
          tagList: ['test', 'jest'],
        },
        {
          title: 'Mock title',
          slug: 'mock-title11',
          body: 'Body o',
          readTime: '2 min',
          author: 'ABC',
          createdAt: '2019-06-21T08:13:05.567Z',
          tagList: ['test', 'jest'],
        },
        {
          title: 'Mock title',
          slug: 'mock-title111',
          body: 'Body o',
          readTime: '2 min',
          author: 'ABC',
          createdAt: '2019-06-21T08:13:05.567Z',
          tagList: ['test', 'jest'],
        },
        {
          title: 'Mock title',
          slug: 'mock-title1111',
          body: 'Body o',
          readTime: '2 min',
          author: 'ABC',
          createdAt: '2019-06-21T08:13:05.567Z',
          tagList: ['test', 'jest'],
        },
        {
          title: 'Mock title',
          slug: 'mock-title11111',
          body: 'Body o',
          readTime: '2 min',
          author: 'ABC',
          createdAt: '2019-06-21T08:13:05.567Z',
          tagList: ['test', 'jest'],
        },
        {
          title: 'Mock title',
          slug: 'mock-title111111',
          body: 'Body o',
          readTime: '2 min',
          author: 'ABC',
          createdAt: '2019-06-21T08:13:05.567Z',
          tagList: ['test', 'jest'],
        },
      ],
    },
  },
};
const mockStore = configureMockStore([thunk]);
const store = mockStore(initialState);

const props = {
  onFetchArticles: jest.fn(),
  article: {
    feeds: {},
    isProgressOn: false,
  },
};
describe('<Welcome />', () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    const component = shallow(
      <Provider store={store}>
        <Welcome {...props} />
      </Provider>,
    );
    expect(component).toMatchSnapshot();
  });

  test('should render <Welcome />', () => {
    const wrapper = mount(
      <Router>
        <Provider store={store}>
          <Welcome {...props} isProgressOn />
        </Provider>
      </Router>,
    );
    expect(wrapper.find('Welcome')).toBeDefined();
  });

  test('Test when loader is false', () => {
    const wrapper = mount(
      <Router>
        <Provider store={store}>
          <Welcome {...props} isProgressOn={false} />
        </Provider>
      </Router>,
    );
    expect(wrapper.find('Welcome')).toBeDefined();
  });
});

import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import Bookmark from '../../components/container/bookmark';

const mockStore = configureMockStore([thunk]);
let store;
let component;
const initialState = {
  article: {
    bookmarks: [
      {
        title: 'Mock title',
        slug: 'mock-title',
        body: 'Body o',
        readTime: '2 min',
        author: 'ABC',
        createdAt: '2019-06-21T08:13:05.567Z',
        tagList: ['test', 'jest'],
      },
    ],
    bookmark: '',
  },
};

const props = {
  allBookmarks: jest.fn(),
  remove: jest.fn(),
  history: [],
  toastManager: {},
};

describe('Bookmark tests', () => {
  beforeEach(() => {
    store = mockStore(initialState);
    component = mount(
      <Provider store={store}>
        <Router>
          <Bookmark {...props} />
        </Router>
      </Provider>,
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should render the component', () => {
    expect(component).toBeDefined();
  });

  test('Should render the component when user has no bookmark ', () => {
    const state = {
      article: {
        bookmarks: [],
        bookmark: '',
      },
    };
    store = mockStore(state);
    component = mount(
      <Provider store={store}>
        <Router>
          <Bookmark {...props} />
        </Router>
      </Provider>,
    );
    expect(component).toBeDefined();
  });
});

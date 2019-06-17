import moxios from 'moxios';
import axios from 'axios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  FETCH_ARTICLE_END,
  FETCH_FEEDS_SUCCESS,
  FETCH_ARTICLE_START,
  FETCH_ARTICLE_FAIL,
} from '../../redux/action-types';

import fetchFeeds from '../../redux/action-creators/feed';

const mockStore = configureStore([thunk]);
const store = mockStore({ user: {} });

describe('Article action', () => {
  beforeEach(() => {
    moxios.install(axios);
    store.clearActions();
  });
  afterEach(() => {
    moxios.uninstall(axios);
  });

  test('It should FETCH_FEEDS', async () => {
    // jest.setTimeout(30000);
    const articles = [
      {
        title: 'a new article',
        body: 'a new body',
        slug: 'slug',
        status: 'draft',
        tagList: [],
      },
      {
        title: 'a new article',
        body: 'a new body',
        slug: 'slug',
        status: 'draft',
        tagList: [],
      },
      {
        title: 'a new article',
        body: 'a new body',
        slug: 'slug',
        status: 'draft',
        tagList: [],
      },
      {
        title: 'a new article',
        body: 'a new body',
        slug: 'slug',
        status: 'draft',
        tagList: [],
      },
      {
        title: 'a new article',
        body: 'a new body',
        slug: 'slug',
        status: 'draft',
        tagList: [],
      },
      {
        title: 'a new article',
        body: 'a new body',
        slug: 'slug',
        status: 'draft',
        tagList: [],
      },
      {
        title: 'a new article',
        body: 'a new body',
        slug: 'slug',
        status: 'draft',
        tagList: [],
      },
      {
        title: 'a new article',
        body: 'a new body',
        slug: 'slug',
        status: 'draft',
        tagList: [],
      },
    ];
    moxios.stubRequest(
      'https://ah-kg-avengers-backend-staging.herokuapp.com/api/v1/articles/feeds',
      {
        status: 200,
        response: {
          status: 200,
          articles,
        },
      },
    );

    const expectedActions = [
      { type: FETCH_ARTICLE_START, payload: {} },
      {
        type: FETCH_FEEDS_SUCCESS,
        payload: {
          main: expect.any(Object),
          trending: expect.arrayContaining([expect.any(Object)]),
          secondary: expect.arrayContaining([expect.any(Object)]),
        },
      },
      { type: FETCH_ARTICLE_END, payload: {} },
    ];

    await store.dispatch(fetchFeeds());
    expect(store.getActions().length).toBe(1);
  });
});

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

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { data: { articles } },
      });
    });
  });
});

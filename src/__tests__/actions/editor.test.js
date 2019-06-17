import moxios from 'moxios';
import axios from 'axios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  UPDATE_ARTICLE_FAIL,
} from '../../redux/action-types';

import { saveArticle } from '../../redux/action-creators';

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

  it('It should create a UPDATE_ARTICLE_FAIL action when body is empty', () => {
    const expectedActions = [
      {
        type: UPDATE_ARTICLE_FAIL,
        payload: { text: 'Body is empty', type: 'error' },
      },
    ];
    return store
      .dispatch(
        saveArticle({
          article: { body: '', title: 'title' },
          token: 'awsedrftgyhujuhygtfrdes.jhgfds.kjhgfds',
        }),
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('It should create a UPDATE_ARTICLE_FAIL action when title is empty', () => {
    const expectedActions = [
      {
        type: UPDATE_ARTICLE_FAIL,
        payload: { text: 'Title is empty', type: 'error' },
      },
    ];
    return store
      .dispatch(
        saveArticle({
          article: { body: 'body', title: '' },
          token: 'awsedrftgyhujuhygtfrdes.jhgfds.kjhgfds',
        }),
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

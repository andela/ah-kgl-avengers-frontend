import moxios from 'moxios';
import axios from 'axios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  FETCH_START,
  FETCH_END,
  FETCH_PROFILE_FAIL,
  FETCH_PROFILE_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
} from '../../redux/action-types';

import { updateUser, getUser } from '../../redux/action-creators/profile';

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

  it('it should dispatch FETCH_USER_SUCCESS action', () => {
    const profile = {
      username: 'username',
      image:
        'https://res.cloudinary.com/avpaul/image/upload/v1561626377/haven/wnr74umqlkkmuddkbhpv.png',
      firstName: 'first',
      lastName: 'user',
      email: 'user@gmail.com',
      bio: 'the professional guy in the house is there testing',
    };

    moxios.stubRequest(
      'https://ah-kg-avengers-backend-staging.herokuapp.com/api/v1/users/profile/username',
      {
        status: 200,
        response: {
          status: 200,
          profile,
        },
      },
    );

    moxios.stubRequest(
      'https://ah-kg-avengers-backend-staging.herokuapp.com/api/v1/user/username/articles',
      {
        status: 200,
        response: {
          status: 200,
          data: [],
        },
      },
    );

    const expectedActions = [
      { type: FETCH_START, payload: {} },
      {
        type: FETCH_PROFILE_SUCCESS,
        payload: { user: profile, articles: [] },
      },
      { type: FETCH_END, payload: {} },
    ];

    return store.dispatch(getUser('username')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('it should dispatch FETCH_PROFILE_FAIL action', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          status: 400,
          error: 'user not found',
        },
      });
    });

    const expectedActions = [
      { type: FETCH_START, payload: {} },
      {
        type: FETCH_PROFILE_FAIL,
        payload: 'user not found',
      },
      { type: FETCH_END, payload: {} },
    ];

    return store.dispatch(getUser('username')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('it should dispatch UPDATE_PROFILE_SUCCESS action', () => {
    const profile = {
      username: 'username',
      image:
        'https://res.cloudinary.com/avpaul/image/upload/v1561626377/haven/wnr74umqlkkmuddkbhpv.png',
      firstName: 'first',
      lastName: 'user',
      email: 'user@gmail.com',
      bio: 'the professional guy in the house is there testing',
    };
    moxios.stubRequest(
      'https://ah-kg-avengers-backend-staging.herokuapp.com/api/v1/users/profile/username/update',
      {
        status: 200,
        response: {
          status: 200,
          message: 'user profile updated',
          profile,
        },
      },
    );

    const expectedActions = [
      { type: FETCH_START, payload: {} },
      {
        type: UPDATE_PROFILE_SUCCESS,
        payload: profile,
      },
      { type: FETCH_END, payload: {} },
    ];

    return store.dispatch(updateUser({ username: 'username', data: profile })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('it should dispatch UPDATE_USER_FAIL action', async () => {
    const profile = {};
    moxios.stubRequest(
      'https://ah-kg-avengers-backend-staging.herokuapp.com/api/v1/users/profile/username/update',
      {
        status: 400,
        response: {
          data: {
            status: 400,
            errors: 'user not found',
          },
        },
      },
    );

    const expectedActions = [
      { type: FETCH_START, payload: {} },
      {
        type: UPDATE_PROFILE_FAIL,
        payload: 'user not found',
      },
      { type: FETCH_END, payload: {} },
    ];

    await store.dispatch(updateUser({ username: 'username', data: profile }));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

import reducer from '../../redux/reducers/article';
import * as TYPES from '../../redux/action-types';
import initialState from '../../redux/initialState';

describe('Article Reducer', () => {
  // test the state
  it('should return the initial `state`', () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });

  // test the reducer to handle the action type
  it('should update the redirect object', () => {
    const expectedState = {
      ...initialState,
      redirect: { to: '/login', message: 'Login to update your profile' },
    };
    expect(
      reducer(initialState, {
        type: TYPES.REDIRECT_TO,
        payload: { to: '/login', message: 'Login to update your profile' },
      }),
    ).toEqual(expectedState);
  });

  it('should add created article', () => {
    expect(
      reducer(initialState, {
        type: TYPES.UPDATE_ARTICLE_SUCCESS,
        payload: { title: 'men will be men' },
      }),
    ).toEqual({ ...initialState, article: { title: 'men will be men' } });
  });

  it('should add a message', () => {
    expect(
      reducer(initialState, {
        type: TYPES.UPDATE_ARTICLE_FAIL,
        payload: { text: 'token invalid', type: 'error' },
      }),
    ).toEqual({ ...initialState, message: { text: 'token invalid', type: 'error' } });

    expect(
      reducer(initialState, {
        type: TYPES.DELETE_ARTICLE_FAIL,
        payload: { text: 'token invalid', type: 'error' },
      }),
    ).toEqual({ ...initialState, message: { text: 'token invalid', type: 'error' } });

    expect(
      reducer(initialState, {
        type: TYPES.DELETE_ARTICLE_SUCCESS,
        payload: { slug: 'ghfghfgfhfhgfh', status: 'published' },
      }),
    ).toEqual({
      ...initialState,
      articles: initialState.articles.filter(item => item.slug !== 'ghfghfgfhfhgfh'),
    });
  });

  it('should update the isInProgress variable', () => {
    expect(reducer(initialState, { type: TYPES.CREATE_ARTICLE_STARTED, payload: {} })).toEqual({
      ...initialState,
      isProgressOn: true,
    });
  });
});

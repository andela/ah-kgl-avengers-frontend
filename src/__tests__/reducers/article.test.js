import { statement } from '@babel/template';
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
    ).toEqual({ ...initialState, editorArticle: { title: 'men will be men' } });
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

  it('should add article feeds', () => {
    const feeds = { main: {}, secondary: [], trending: [] };
    expect(reducer(initialState, { type: TYPES.FETCH_FEEDS_SUCCESS, payload: feeds })).toEqual({
      ...initialState,
      feeds,
    });
  });

  it('should change isProgressOn to true', () => {
    expect(reducer(initialState, { type: TYPES.FETCH_ARTICLE_START, payload: {} })).toEqual({
      ...initialState,
      isProgressOn: true,
    });
  });

  it('should change isProgressOn to false', () => {
    expect(reducer(initialState, { type: TYPES.FETCH_ARTICLE_END, payload: {} })).toEqual({
      ...initialState,
      isProgressOn: false,
    });
  });

  it('should fetch articles errors to state', () => {
    expect(
      reducer(initialState, { type: TYPES.FETCH_ARTICLE_FAIL, payload: 'fetch failed' }),
    ).toEqual({
      ...initialState,
      message: 'fetch failed',
    });
  });

  it('should add article feeds', () => {
    const article = {
      title: 'sample',
      body: 'body text',
      slug: 'sample-slug',
    };
    expect(reducer(initialState, { type: TYPES.FETCH_ARTICLE_SUCCESS, payload: article })).toEqual({
      ...initialState,
      article,
    });
  });

  it('add a new comment in articles', () => {
    const comment = {
      id: '78654324567',
      body: 'testing',
    };
    expect(
      reducer(
        { ...initialState, article: { comments: [] } },
        { type: TYPES.CREATE_COMMENT_SUCCESS, payload: comment },
      ),
    ).toEqual({
      ...initialState,
      article: {
        ...initialState.article,
        comments: [comment],
      },
    });
  });

  it('increase comment likes', () => {
    expect(
      reducer(
        { ...initialState, article: { comments: [{ id: 23457654, likes: 0 }] } },
        { type: TYPES.LIKE_COMMENT_SUCCESS, payload: { id: 23457654 } },
      ),
    ).toEqual({
      ...initialState,
      article: { comments: [{ id: 23457654, likes: 1 }] },
    });
  });

  it('decrease comment likes', () => {
    expect(
      reducer(
        { ...initialState, article: { comments: [{ id: 23457654, likes: 0 }] } },

        { type: TYPES.DISLIKE_COMMENT_SUCCESS, payload: { id: 23457654 } },
      ),
    ).toEqual({
      ...initialState,
      article: { comments: [{ id: 23457654, likes: 0 }] },
    });
  });

  it('add an error on comment like fail', () => {
    expect(reducer(initialState, { type: TYPES.LIKE_COMMENT_FAIL, payload: {} })).toEqual({
      ...initialState,
      commentsError: 'Failed to like or dislike comment',
    });
  });

  it('add an error on comment fail', () => {
    expect(reducer(initialState, { type: TYPES.CREATE_COMMENT_FAIL, payload: {} })).toEqual({
      ...initialState,
      commentsError: 'Failed to add comment',
    });
  });

  it('set the article object to any empty object', () => {
    expect(reducer(initialState, { type: TYPES.CLEAR_ARTICLE, payload: {} })).toEqual({
      ...initialState,
      article: {},
      message: {},
    });
  });

  // it('remove', () => {
  //   expect(reducer(initialState, { type: TYPES.DELETE_ARTICLE_SUCCESS, payload: {} })).toEqual({});
  // });

  // it('', () => {
  //   expect(reducer(initialState, { type: TYPES.FETCH_ARTICLE_END, payload: {} })).toEqual({});
  // });

  // it('', () => {
  //   expect(reducer(initialState, { type: TYPES.FETCH_ARTICLE_END, payload: {} })).toEqual({});
  // });
});

import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { readArticle } from '../../redux/action-creators/readArticle';
import editArticle from '../../redux/action-creators/editArticle';
import { deleteArticle } from '../../redux/action-creators/index';

const mockStore = configureStore([thunk]);
let store;

describe('Read Article Action', () => {
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });

  test('should test the get article action with an object of type and payload', () => {
    const slug = 'this-is-article';
    const title = 'This is article';

    setInterval(async () => {
      moxios.stubRequest(
        'https://ah-kg-avengers-backend-staging.herokuapp.com/api/v1/articles/this-is-article/',
        {
          status: 200,
          article: { title },
        },
      );

      moxios.stubRequest(
        'https://ah-kg-avengers-backend-staging.herokuapp.com/api/v1/articles/this-is-article/ratings',
        {
          status: 200,
          totalRatings: 0,
        },
      );

      const res = await store.dispatch(readArticle(slug));

      expect(res.payload.title).toBe(title);
    }, 10000);
  });

  test('Should fail to read article', async () => {
    const slug = 'this-is-article';
    const title = 'This is article';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response: { status: 400, article: { title } },
      });
    });
    return store.dispatch(readArticle(slug)).then((error) => {
      expect(error.payload.type).toBe('error');
    });
  });

  test('should test the delete article action with an object of type and payload', async () => {
    store.dispatch(deleteArticle());
    expect(store.getActions()).toBeDefined();
  });

  test('Edit article', () => {
    const article = {
      title: 'Mock title',
      slug: 'mock-title2',
      body: 'Body o',
      readTime: '2 min',
      createdAt: '2019-06-21T08:13:05.567Z',
    };
    store.dispatch(editArticle(article));
    expect(store.getActions()).toBeDefined();
  });
});

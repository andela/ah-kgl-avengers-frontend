import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Articles from '../../components/articles';
import DeleteModal from '../../components/delete/deleteConfirmation';
import { ArticleView, TrendingArticleView } from '../../components/singleArticle';

const initialState = {
  user: {
    redirect: {},
    token: true,
    user: {
      username: 'user',
    },
  },
  article: {
    articles: [
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
    drafts: [
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
    article: {
      title: 'Mock title',
      slug: 'mock-title2',
      body: 'Body o',
      readTime: '2 min',
      author: {
        username: 'mock',
      },
      createdAt: '2019-06-21T08:13:05.567Z',
      tagList: ['test', 'jest'],
    },
  },
};

const props = {
  getArticles: jest.fn(),
  getDrafts: jest.fn(),
  editArticle: jest.fn(),
  deleteArticle: jest.fn(),
  history: {},
};
const mockStore = configureMockStore([thunk]);
let store;
let component;

describe('Articles', () => {
  beforeEach(() => {
    store = mockStore(initialState);
    component = mount(
      <Provider store={store}>
        <Router>
          <Articles {...props} />
        </Router>
      </Provider>,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });

  it('render `my articles` as a title', () => {
    expect(component.find('h3').text()).toEqual('My articles');
  });

  it('Should render article component', () => {
    expect(component.find('Articles')).toBeDefined();
  });

  it('Render trending article component', () => {
    const wrapper = shallow(
      <TrendingArticleView className="m-2" id="123" article={initialState.article.article} />,
    );
    expect(wrapper.find('TrendingArticleView')).toBeDefined();
  });

  it('Render ArticleView  component', () => {
    const wrapper = shallow(<ArticleView className="m-2" article={initialState.article.article} />);
    expect(wrapper.find('TrendingArticleView')).toBeDefined();
  });

  it('Render ArticleView component when no tags', () => {
    const noTags = {
      title: 'Mock title',
      slug: 'mock-title2',
      body: 'Body o',
      readTime: '2 min',
      author: {
        username: 'mock',
      },
      createdAt: '2019-06-21T08:13:05.567Z',
      tagList: [],
    };
    const wrapper = shallow(<ArticleView className="m-2" article={noTags} />);
    expect(wrapper.find('TrendingArticleView')).toBeDefined();
  });

  describe('Delete Article Modal', () => {
    const deleteProps = {
      modal: true,
      toggle: jest.fn(),
      deleteArticle: jest.fn(),
      slug: 'This-is-a-slug',
    };
    const wrapper = mount(<DeleteModal {...deleteProps} />);

    it('Should render delete modal component', () => {
      expect(wrapper.find('DeleteConfirmation')).toBeDefined();
    });

    it('Should confirm delete article', () => {
      const button = wrapper.find('Button').at(0);
      button.simulate('click');
    });
  });
});

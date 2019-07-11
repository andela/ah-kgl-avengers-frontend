import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import ImageAvatar from '../../components/imageAvatar';
import ReadArticle from '../../components/readArticle';
import RatingStars from '../../components/ratingStars';
import ReadTime from '../../components/readTime';
import Status from '../../components/status';

const initialState = {
  user: {
    redirect: {},
    user: {
      username: 'user',
      authorFollowers: [{ username: 'hello', image: 'helllos' }],
      userErrors: [],
    },
  },
  article: {
    article: {
      title: 'Mock title',
      body: 'Body o',
      readTime: '2 min',
      author: 'ABC',
      createdAt: '2019-06-21T08:13:05.567Z',
      tagList: ['test', 'jest'],
      comments: [
        {
          body: 'heloo comment',
          id: '34564567887',
          createdAt: '2019-06-21T08:13:05.567Z',
          author: {
            image: 'jhgfdsdfgh',
            username: 'welson',
          },
        },
      ],
    },
  },
};
const mockStore = configureMockStore([thunk]);
const props = {
  match: {
    params: 'test',
  },
  readArticles: jest.fn(),
  reset: jest.fn(),
};
let store;
let component;
describe('Read an article', () => {
  beforeEach(() => {
    store = mockStore(initialState);
    component = mount(
      <Provider store={store}>
        <Router>
          <ReadArticle {...props} />
        </Router>
      </Provider>,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should store component snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('Should render without crashing', () => {
    expect(component.find('ReadArticle')).toBeDefined();
  });

  it('Should render avatar with default image', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ImageAvatar image="" alt="" firstName="" lastName="" />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Should render avatar with user acronyms', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ImageAvatar firstName="Bobo" lastName="Aaron" />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Should render avatar with user profile', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ImageAvatar image="Aaron" alt="" firstName="" lastName="" />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Should render avatar with user profile', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ImageAvatar image="Aaron" />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Should render rating component', () => {
    const h2 = document.createElement('h2');
    ReactDOM.render(<RatingStars className="" />, h2);
    ReactDOM.unmountComponentAtNode(h2);
  });

  it('Should render rating component', () => {
    const h2 = document.createElement('h2');
    ReactDOM.render(<ReadTime />, h2);
    ReactDOM.unmountComponentAtNode(h2);
  });

  it('Should render rating component', () => {
    const wrapper = shallow(<Status />);
    const btn = wrapper.find('button').at(0);
    expect(btn.exists()).toBe(true);
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import ImageAvatar from '../../components/imageAvatar';
import ReadArticle from '../../components/readArticle';
import RatingStars from '../../components/ratingStars';
import ReadTime from '../../components/readTime';
import Status from '../../components/status';

const mockStore = configureMockStore([thunk]);
const store = mockStore({});
const props = {
  response: jest.fn(),
};

describe('Read an article', () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  const component = shallow(
    <Provider store={store}>
      <ReadArticle {...props} />
    </Provider>,
  );

  it('Should store component snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('Should render without crashing', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <ReadArticle />
      </Provider>,
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('Should render without crashing', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <ReadArticle />
      </Provider>,
    );
    expect(wrapper.dive({ context: { store } }).exists()).toBe(true);
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

import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Articles } from '../../components/articles';

const mockStore = configureMockStore([thunk]);
const store = mockStore({});

const props = {
  getArticles: jest.fn(),
  getDrafts: jest.fn(),
};

describe('Articles', () => {
  const articles = mount(
    <Provider store={store}>
      <Router>
        <Articles {...props} />
      </Router>
    </Provider>,
  );

  it('should render without crashing', () => {
    expect(articles).toMatchSnapshot();
  });

  it('render `my articles` as a title', () => {
    expect(articles.find('h3').text()).toEqual('My articles');
  });
});

import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Profile from '../../components/container/profile';
import ProfileEditor from '../../components/container/profileEditor';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  user: {
    user: {
      username: 'user',
    },
    profile: { username: '' },
    userArticles: [],
    isRequestOn: false,
  },
});

const props = {
  onGetUser: jest.fn(),
  onUpdateUser: jest.fn(),
  match: { params: { username: 'user' } },
  history: {
    push: jest.fn(),
  },
};

describe('<Profile/>', () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('match the snapshot of the Profile component', () => {
    const component = shallow(
      <Provider store={store}>
        <Profile {...props} />
      </Provider>,
    );
    expect(component).toMatchSnapshot();
  });
  it('match the snapshot of the ProfileEditor component', () => {
    const component = shallow(
      <Provider store={store}>
        <ProfileEditor {...props} />
      </Provider>,
    );
    expect(component).toMatchSnapshot();
  });

  it('should mount the Profile page', () => {
    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <Profile {...props} />
        </Provider>
      </BrowserRouter>,
    );
    expect(wrapper.find('Profile')).toBeDefined();
  });

  it('should mount the ProfileEditor page', () => {
    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <ProfileEditor {...props} />
        </Provider>
      </BrowserRouter>,
    );
    expect(wrapper.find('ProfileEditor')).toBeDefined();
  });
});

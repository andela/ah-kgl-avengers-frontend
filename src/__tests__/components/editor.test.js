import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Editor from '../../components/editor/editor';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  article: {
    user: {},
    article: {},
    message: {},
    isProgressOn: false,
  },
});

const props = {
  onSaveArticle: jest.fn(),
};
describe('<Editor />', () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });
  const component = shallow(
    <Provider store={store}>
      <Editor {...props} />
    </Provider>,
  );
  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
  test('should mount the editor', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Editor {...props} />
      </Provider>,
    );
    expect(wrapper.find('Editor')).toBeDefined();
  });
});

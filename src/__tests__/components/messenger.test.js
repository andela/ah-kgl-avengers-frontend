import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Messenger from '../../components/editor/message';

const mockStore = configureMockStore([thunk]);
const store = mockStore({});

const props = {
  welcome: jest.fn(),
  response: jest.fn(),
};
describe('<Chips />', () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });
  const component = shallow(<Messenger messages={['node', 'es6']} type="error" />);
  it('should render without the component', () => {
    expect(component).toMatchSnapshot();
  });

  test('should mount the editor', () => {
    const wrapper = mount(<Messenger messages={['node', 'es6']} type="error" />);
    expect(wrapper.find('Messenger')).toBeDefined();
  });
});

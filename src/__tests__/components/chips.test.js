import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Chips from '../../components/chips/chips';

const mockStore = configureMockStore([thunk]);
const store = mockStore({});

const props = {
  onChange: jest.fn(),
};
describe('<Chips />', () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });
  const component = shallow(<Chips value={['node', 'es6']} label="add tags" {...props} />);
  it('should render without the component', () => {
    expect(component).toMatchSnapshot();
  });

  test('should mount the editor', () => {
    const wrapper = mount(<Chips value={['node', 'es6']} label="add tags" {...props} />);
    expect(wrapper.find('Chips')).toBeDefined();
  });
});

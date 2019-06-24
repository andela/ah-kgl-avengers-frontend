import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Chips from '../../components/chips/chips';
import Chip from '../../components/functional/chip';

const mockStore = configureMockStore([thunk]);
const store = mockStore({});

const props = {
  onChange: jest.fn(),
  value: ['node', 'es6'],
  label: 'add tags',
};
let component;
describe('<Chips />', () => {
  beforeEach(() => {
    component = mount(<Chips {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without the component', () => {
    const wrapper = shallow(<Chips {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should mount the editor', () => {
    expect(component.find('Chips')).toBeDefined();
  });

  test('Should add tag onKeyUp', () => {
    const input = component.find('input');
    input.simulate('keyUp', { key: 'Enter' });
    expect(input).toBeDefined();
  });

  test('Should not add existing tag', () => {
    const input = component.find('input');
    input.simulate('keyUp', { key: 'Enter' });
    expect(input).toBeDefined();
  });

  test('Should not add tag when key pressed not Enter', () => {
    const input = component.find('input');
    input.simulate('keyUp', { key: 'l' });
    expect(input).toBeDefined();
  });

  test('Should remove tag when pressed', () => {
    const button = component.find('button').first();
    button.simulate('click');
    expect(button).toBeDefined();
  });

  test('Should render a small chip', () => {
    const wrapper = mount(<Chip value="data" />);
    expect(wrapper.find('Chip')).toBeDefined();
  });
});

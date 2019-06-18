import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import NavBar from '../../components/functional/navBar';

const mockStore = configureMockStore([thunk]);
const store = mockStore({});

const props = {
  user: jest.fn(),
};

describe('Shared navigation', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const component = shallow(
    <Provider store={store}>
      <NavBar {...props} />
    </Provider>,
  );

  it('Checking component top level element', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><NavBar /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });

  it('Render component when NavBar toggled ', () => {
    component.setState({ isToggled: true });
    expect(component).toMatchSnapshot();
  });

  it('Nav bar should be toggled when clicked', () => {
    const wrapper = shallow(<NavBar />);
    const toggleButton = wrapper.find('NavbarToggler').at(0);
    toggleButton.simulate('click');
    expect(wrapper.state().isToggled).toEqual(true);
  });
});

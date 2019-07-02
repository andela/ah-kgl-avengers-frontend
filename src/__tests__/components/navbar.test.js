import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import NavBar from '../../components/functional/navBar';
import Navigation from '../../components/functional/navigation';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  user: {
    redirect: {},
    user: {
      username: 'user',
    },
  },
});

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
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <NavBar {...props} />
        </BrowserRouter>
      </Provider>,

      div,
    );
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
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <NavBar {...props} />
        </BrowserRouter>
      </Provider>,
    );
    const toggleButton = wrapper.find('NavbarToggler').at(0);
    toggleButton.simulate('click');
    expect(wrapper.state()).toBeDefined();
  });

  it('Second navigation should be toggled when clicked', () => {
    const wrapper = shallow(<Navigation />);
    const toggleButton = wrapper.find('Button').at(0);
    toggleButton.simulate('click');
    expect(wrapper.state().isToggled).toEqual(true);
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import App from '../app';

describe('<App />', () => {
  test('Should render the App', () => {
    const routes = shallow(<App />);
    expect(routes).toMatchSnapshot();
  });
});

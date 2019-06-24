import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import ArticleTitle from '../../components/articleTitle';
import Date from '../../components/date';
import Description from '../../components/description';
import Image from '../../components/image';
import Nav from '../../components/nav';
import Side from '../../components/side';
import TextArea from '../../components/textArea';
import UserName from '../../components/userNames';

describe('Test all small component together', () => {
  test('Render article title component without crash', () => {
    const wrapper = mount(<ArticleTitle className="mt-2">Title</ArticleTitle>);
    expect(wrapper.find('ArticleTitle')).toBeDefined();
  });

  test('Render article date component without crash', () => {
    const wrapper = mount(<Date className="mt-2">Jun 21, 2019</Date>);
    expect(wrapper.find('Date')).toBeDefined();
  });

  test('Render article description component without crash', () => {
    const wrapper = mount(<Description className="mt-2">Here we are</Description>);
    expect(wrapper.find('Description')).toBeDefined();
  });

  test('Render article image component without crash', () => {
    const wrapper = mount(<Image className="mt-2" alt="hello" image="http://sdafsd.com" />);
    expect(wrapper.find('Image')).toBeDefined();
  });

  test('Render article nav component without crash', () => {
    const wrapper = mount(
      <Router>
        <Nav />
      </Router>,
    );
    expect(wrapper.find('Nav')).toBeDefined();
  });

  test('Render article side component without crash', () => {
    const wrapper = mount(<Side img="http://sdafsd.com" />);
    expect(wrapper.find('Side')).toBeDefined();
  });

  test('Render article textarea component without crash', () => {
    const wrapper = mount(<TextArea className="mt-2">{['data', 'data']}</TextArea>);
    expect(wrapper.find('TextArea')).toBeDefined();
  });

  test('Render article textarea component without crash', () => {
    const wrapper = mount(<UserName className="mt-2">Avengers</UserName>);
    expect(wrapper.find('UserNames')).toBeDefined();
  });
});

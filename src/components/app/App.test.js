import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import { shallow } from 'enzyme';

import App from './App';
import Article from '../article';
import ArticleParamsForm from '../article-params-form';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders without crashing', () => {
  render(<App />, container);
});

it('should start with empty params', () => {
  const wrapper = shallow(<App />);
  const comp = wrapper.instance();
  expect(comp.articleParams).toBeFalsy();
});

it('should show form when params is empty', () => {
  const wrapper = shallow(<App />);

  const form = wrapper.find(ArticleParamsForm);
  expect(form).toHaveLength(1);

  const article = wrapper.find(Article);
  expect(article).toHaveLength(0);
});

it('should show article when there are params', () => {
  const wrapper = shallow(<App />);
  const comp = wrapper.instance();

  const mockParams = {
    contentHubId: '8407ca6f-95a5-4123-aada-2fa471b5a793',
    contentId: '555e6330-b848-4320-8bc5-19097ad48e7b',
  };
  comp.handleParamsSubmit(mockParams);

  const form = wrapper.find(ArticleParamsForm);
  expect(form).toHaveLength(0);

  const article = wrapper.find(Article);
  expect(article).toHaveLength(1);
  expect(article.prop('params')).toEqual(mockParams);
});

it('should receive article params', () => {
  const wrapper = shallow(<App />);
  const comp = wrapper.instance();

  const mockParams = {
    contentHubId: '8407ca6f-95a5-4123-aada-2fa471b5a793',
    contentId: '555e6330-b848-4320-8bc5-19097ad48e7b',
  };
  comp.handleParamsSubmit(mockParams);

  const article = wrapper.find(Article);
  expect(article).toHaveLength(1);
  expect(article.prop('params')).toEqual(mockParams);
});

it('should clean article params', () => {
  const wrapper = shallow(<App />);
  const comp = wrapper.instance();

  comp.handleClose();

  const article = wrapper.find(Article);
  expect(article).toHaveLength(0);
});

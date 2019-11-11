import React from 'react';
import { act } from 'react-dom/test-utils';

import { shallow } from 'enzyme';

import App from './App';
import Article from '../article';
import ArticleParamsForm from '../article-params-form';

const mockParams = {
  contentHubId: '8407ca6f-95a5-4123-aada-2fa471b5a793',
  contentId: '555e6330-b848-4320-8bc5-19097ad48e7b',
};

it('renders without crashing', () => {
  const wrapper = shallow(<App />)
  expect(wrapper).toBeTruthy();
});

it('should show form when params is empty', () => {
  const wrapper = shallow(<App articleParams={null} />);
  expect(wrapper.find(ArticleParamsForm)).toHaveLength(1);
  expect(wrapper.find(Article)).toHaveLength(0);
});

it('should show article when there are params', () => {
  const wrapper = shallow(<App articleParams={mockParams} />);
  expect(wrapper.find(ArticleParamsForm)).toHaveLength(0);
  expect(wrapper.find(Article)).toHaveLength(1);
});

it('should start with empty params', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(ArticleParamsForm)).toHaveLength(1);
});

it('should receive article params', () => {
  const wrapper = shallow(<App />);

  const form = wrapper.find(ArticleParamsForm);
  act(() => { form.prop('onSubmit')(mockParams); });

  const article = wrapper.find(Article);
  expect(article).toHaveLength(1);
  expect(article.prop('params')).toEqual(mockParams);
});

it('should clean article params', () => {
  const wrapper = shallow(<App articleParams={mockParams} />);

  const article = wrapper.find(Article);
  act(() => { article.prop('onClose')(); });

  expect(wrapper.find(Article)).toHaveLength(0);
});

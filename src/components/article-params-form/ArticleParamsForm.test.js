import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { shallow } from 'enzyme';

import ArticleParamsForm from './ArticleParamsForm';

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
  render(<ArticleParamsForm />, container);
});

it('should build the form', () => {
  act(() => { render(<ArticleParamsForm />, container); });
  expect(container.querySelector('form')).toBeTruthy();
  expect(container.querySelector('[name="contentHubId"]')).toBeTruthy();
  expect(container.querySelector('[name="contentId"]')).toBeTruthy();
});

it('Content Hub ID field should be a valid UUID', () => {
  const wrapper = shallow(<ArticleParamsForm />);
  const comp = wrapper.instance();
  comp.handleBlur('contentHubId');

  comp.handleChange('contentHubId', '');
  expect(comp.errorMessage('contentHubId')).toBe('cannot be blank');

  comp.handleChange('contentHubId', '   ');
  expect(comp.errorMessage('contentHubId')).toBe('cannot be blank');

  comp.handleChange('contentHubId', 'some random value');
  expect(comp.errorMessage('contentHubId')).toBe('invalid UUID');

  comp.handleChange('contentHubId', '1ddeb42e-2d64-423e-878b-c3cc50193629');
  expect(comp.errorMessage('contentHubId')).toBeNull();
});

it('Content ID field should be a valid UUID', () => {
  const wrapper = shallow(<ArticleParamsForm />);
  const comp = wrapper.instance();
  comp.handleBlur('contentId');

  comp.handleChange('contentId', '');
  expect(comp.errorMessage('contentId')).toBe('cannot be blank');

  comp.handleChange('contentId', '   ');
  expect(comp.errorMessage('contentId')).toBe('cannot be blank');

  comp.handleChange('contentId', 'some random value');
  expect(comp.errorMessage('contentId')).toBe('invalid UUID');

  comp.handleChange('contentId', '1ddeb42e-2d64-423e-878b-c3cc50193629');
  expect(comp.errorMessage('contentId')).toBeNull();
});

it('should prevent submission of invalid form', () => {
  const onSubmit = jest.fn();
  const wrapper = shallow(<ArticleParamsForm onSubmit={onSubmit} />);
  const comp = wrapper.instance();

  const form = wrapper.find('form');
  form.simulate('submit', new Event('mockEvent'));

  expect(comp.isValid()).toBe(false);
  expect(onSubmit).toHaveBeenCalledTimes(0);
});

it('should submit if form is valid', () => {
  const onSubmit = jest.fn();
  const wrapper = shallow(<ArticleParamsForm onSubmit={onSubmit} />);
  const comp = wrapper.instance();

  comp.handleChange('contentHubId', '9f19ed00-a9e3-47a3-9e64-28a2c6e2c92b');
  comp.handleChange('contentId', '7ff9f624-6934-4a26-a269-6df7e3ef53fb');

  const form = wrapper.find('form');
  form.simulate('submit', new Event('mockEvent'));

  expect(comp.isValid()).toBe(true);
  expect(onSubmit).toHaveBeenCalledTimes(1);
});

import React from 'react';
import { act } from 'react-dom/test-utils';

import { shallow } from 'enzyme';

import ArticleParamsForm from './ArticleParamsForm';

it('renders without crashing', () => {
  const wrapper = shallow(<ArticleParamsForm />);
  expect(wrapper).toBeTruthy();
});

it('should build the form', () => {
  const wrapper = shallow(<ArticleParamsForm />);
  expect(wrapper.find('form')).toHaveLength(1);
  expect(wrapper.find('[name="contentHubId"]')).toHaveLength(1);
  expect(wrapper.find('[name="contentId"]')).toHaveLength(1);
});

it('Content Hub ID field should be a valid UUID', () => {
  const wrapper = shallow(<ArticleParamsForm />);

  const field = () => wrapper.find('.content-hub-id-group');
  const feedback = () => field().prop('invalidFeedback');

  act(() => { field().prop('onChange')(''); });
  expect(feedback()).toBe('cannot be blank');

  act(() => { field().prop('onChange')('   '); });
  expect(feedback()).toBe('cannot be blank');

  act(() => { field().prop('onChange')('some random value'); });
  expect(feedback()).toBe('invalid UUID');

  act(() => { field().prop('onChange')('1ddeb42e-2d64-423e-878b-c3cc50193629'); });
  expect(feedback()).toBeNull();
});

it('Content ID field should be a valid UUID', () => {
  const wrapper = shallow(<ArticleParamsForm />);

  const field = () => wrapper.find('.content-id-group');
  const feedback = () => field().prop('invalidFeedback');

  act(() => { field().prop('onChange')(''); });
  expect(feedback()).toBe('cannot be blank');

  act(() => { field().prop('onChange')('   '); });
  expect(feedback()).toBe('cannot be blank');

  act(() => { field().prop('onChange')('some random value'); });
  expect(feedback()).toBe('invalid UUID');

  act(() => { field().prop('onChange')('1ddeb42e-2d64-423e-878b-c3cc50193629'); });
  expect(feedback()).toBeNull();
});

it('should prevent submission of invalid form', () => {
  const onSubmit = jest.fn();
  const wrapper = shallow(<ArticleParamsForm onSubmit={onSubmit} />);

  expect(wrapper.find('[type="submit"]').prop('disabled')).toBe(true);

  const form = wrapper.find('form');
  form.simulate('submit', new Event('mockEvent'));
  expect(onSubmit).toHaveBeenCalledTimes(0);
});

it('should submit if form is valid', () => {
  const onSubmit = jest.fn();
  const wrapper = shallow(<ArticleParamsForm onSubmit={onSubmit} />);

  const field = className => wrapper.find(className);
  act(() => { field('.content-hub-id-group').prop('onChange')('9f19ed00-a9e3-47a3-9e64-28a2c6e2c92b'); });
  act(() => { field('.content-id-group').prop('onChange')('7ff9f624-6934-4a26-a269-6df7e3ef53fb'); });

  expect(wrapper.find('[type="submit"]').prop('disabled')).toBe(false);

  const form = wrapper.find('form');
  form.simulate('submit', new Event('mockEvent'));
  expect(onSubmit).toHaveBeenCalledTimes(1);
});

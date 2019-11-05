import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import { shallow } from 'enzyme';

import Input from './Input';

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
  render(<Input />, container);
});

it('should add className', () => {
  const mockClassName = 'mock-class-name';
  const wrapper = shallow(<Input className={mockClassName} />);
  const input = wrapper.find('.form-group');
  expect(input.hasClass(mockClassName)).toBe(true);
});

it('should add id', () => {
  const mockId = 'mock-id';
  const wrapper = shallow(<Input id={mockId} />);
  const input = wrapper.find(`#${mockId}`);
  expect(input.hasClass('form-control')).toBe(true);
});

it('should show invalid feedback', () => {
  const errorMessage = 'something wrong is not right';
  const wrapper = shallow(<Input invalidFeedback={errorMessage} />);
  const feedback = wrapper.find('.invalid-feedback');
  expect(feedback).toHaveLength(1);
});

it('should hide invalid feedback', () => {
  const wrapper = shallow(<Input invalidFeedback={null} />);
  const feedback = wrapper.find('.invalid-feedback');
  expect(feedback).toHaveLength(0);
});

it('should show label', () => {
  const mockLabel = 'mock-label';
  const wrapper = shallow(<Input label={mockLabel} />);
  const label = wrapper.find(`label`);
  expect(label.text()).toBe(mockLabel);
});

it('should add name', () => {
  const mockName = 'mock-id';
  const wrapper = shallow(<Input name={mockName} />);
  const input = wrapper.find(`[name="${mockName}"]`);
  expect(input).toHaveLength(1);
});

it('should add placeholder', () => {
  const mockPlaceholder = 'mock-placeholder';
  const wrapper = shallow(<Input placeholder={mockPlaceholder} />);
  const input = wrapper.find(`[placeholder="${mockPlaceholder}"]`);
  expect(input).toHaveLength(1);
});

it('should mark field as invalid', () => {
  const wrapper = shallow(<Input touched={true} valid={false} />);
  const input = wrapper.find('.form-control');
  expect(input.hasClass('is-invalid')).toBe(true);
});

it('should mark fields as valid', () => {
  const wrapper = shallow(<Input touched={true} valid={true} />);
  const input = wrapper.find('.form-control');
  expect(input.hasClass('is-valid')).toBe(true);
});

it('should receive value', () => {
  const mockValue = 'mock-value';
  const wrapper = shallow(<Input value={mockValue} />);
  const input = wrapper.find('.form-control');
  expect(input.prop('value')).toBe(mockValue);
});

it('should emit onBlur', () => {
  const onBlur = jest.fn();
  const wrapper = shallow(<Input onBlur={onBlur} />);
  const input = wrapper.find('.form-control');

  input.simulate('blur');
  expect(onBlur).toHaveBeenCalledTimes(1);
});

it('should emit onChange', () => {
  const mockChange = 'mock-change';
  const onChange = jest.fn();

  const wrapper = shallow(<Input onChange={onChange} />);
  const input = wrapper.find('.form-control');

  input.simulate('change', { target: { value: mockChange } });

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith(mockChange);
});

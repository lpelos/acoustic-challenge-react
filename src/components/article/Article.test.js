import React from 'react';
import { act } from 'react-dom/test-utils';

import { mount, shallow } from 'enzyme';

import {
  AcousticContentNotFoundError,
  AcousticContentUnexpectedError,
} from '../../utils/acoustic-content-client';
import Article from './Article';
import ArticleImageModel from '../../utils/ArticleImage';
import ArticleModel from '../../utils/Article';

const mockFormatedDate = 'Oct 21, 2019 1:00 AM';

jest.mock('moment', () => {
  return () => ({ utcOffset: () => ({ format: () => mockFormatedDate }) });
});

const mockParams = {
  contentHubId: '73c62a8f-06c5-4e95-a23c-b7ec0c9e428e',
  contentId: '60da4048-05f1-46ef-8f61-51cd88c2cc3b',
};

const mockArticle = new ArticleModel({
  author: 'Leeroy Jenkins',
  body: ['<p>LEEEEEEEEEERROOOOOOOOOOY</p>', '<p>JEEENKINNNNSSSS</p>'],
  date: new Date('2009-04-30T13:05:00Z'),
  heading: 'YOLO',
  id: '60da4048-05f1-46ef-8f61-51cd88c2cc3b',
  mainImage: new ArticleImageModel({
    caption: 'Rookery, Upper Blackrock Spire',
    credit: 'the Internetz',
    url: 'http://lorempixel.com/400/200/',
  }),
});

let mockService;
let wrapper;

beforeEach(() => {
  const mockFind = jest.fn().mockResolvedValue(mockArticle);
  mockService = { find: mockFind };
});

afterEach(() => {
  mockService = null;
  wrapper = null;
});

it('renders without crashing', () => {
  wrapper = shallow(
    <Article articleService={mockService} params={mockParams} />
  );
  expect(wrapper).toBeTruthy();
});

it('should render Article', async () => {
  await act(async () => {
    wrapper = mount(
      <Article articleService={mockService} params={mockParams} />
    );
  });
  wrapper.update();

  const heading = wrapper.find('h1');
  expect(heading.first().text()).toBe(mockArticle.heading);

  const author = wrapper.find('.author');
  expect(author.first().text()).toBe(mockArticle.author);

  const date = wrapper.find('.date');
  expect(date.first().text()).toBe(mockFormatedDate);

  const figure = wrapper.find('.figure');
  const { mainImage } = mockArticle;

  const image = figure.find('img');
  expect(image.prop('alt')).toBe(mainImage.caption);
  expect(image.prop('src')).toBe(mainImage.url);

  const caption = figure.find('figcaption');
  expect(caption.first().text()).toBe(mainImage.caption);

  const credit = figure.find('.credit');
  expect(credit.first().text()).toBe(mainImage.credit);

  const sections = wrapper.find('.body section')
  expect(sections).toHaveLength(mockArticle.body.length);

  Object.keys(sections).forEach((key, i) => {
    const section = sections[key];
    expect(mockArticle.body[i]).toContain(section.textContent);
  });
});

it('should show 404 error', async () => {
  const err = new AcousticContentNotFoundError();
  const mockFind = jest.fn().mockRejectedValue(err);
  mockService = { find: mockFind };

  await act(async () => {
    wrapper = mount(
      <Article articleService={mockService} params={mockParams} />
    );
  });
  wrapper.update();

  const error = wrapper.find('.not-found-error');
  expect(error).toHaveLength(1);
});

it('should show unexpected error', async () => {
  const err = new AcousticContentUnexpectedError();
  const mockFind = jest.fn().mockRejectedValue(err);
  mockService = { find: mockFind };

  await act(async () => {
    wrapper = mount(
      <Article articleService={mockService} params={mockParams} />
    );
  });
  wrapper.update();

  const error = wrapper.find('.unexpected-error');
  expect(error).toHaveLength(1);
});

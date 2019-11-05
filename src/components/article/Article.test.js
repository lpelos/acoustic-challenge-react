import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

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

let container;
let mockService;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);

  const mockFind = jest.fn().mockResolvedValue(mockArticle);
  mockService = { find: mockFind };
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders without crashing', () => {
  render(
    <Article articleService={mockService} params={mockParams} />,
    container
  );
});

it('should fetch Article', () => {
  act(() => {
    render(
      <Article articleService={mockService} params={mockParams} />,
      container
    );
  })

  expect(mockService.find).toHaveBeenCalledTimes(1);
  expect(mockService.find).toHaveBeenCalledWith(mockParams);
});

it('should render Article', async () => {
  await act(async () => {
    render(
      <Article articleService={mockService} params={mockParams} />,
      container
    );
  });

  const heading = container.querySelector('h1');
  expect(heading.textContent).toBe(mockArticle.heading);

  const author = container.querySelector('.author');
  expect(author.textContent).toBe(mockArticle.author);

  const date = container.querySelector('.date');
  expect(date.textContent).toBe(mockFormatedDate);

  const figure = container.querySelector('.figure');
  const { mainImage } = mockArticle;

  const image = figure.querySelector('img');
  expect(image.getAttribute('alt')).toBe(mainImage.caption);
  expect(image.getAttribute('src')).toBe(mainImage.url);

  const caption = figure.querySelector('figcaption');
  expect(caption.textContent).toBe(mainImage.caption);

  const credit = figure.querySelector('.credit');
  expect(credit.textContent).toBe(mainImage.credit);

  container.querySelectorAll('.body section').forEach((section, i) => {
    expect(mockArticle.body[i]).toContain(section.textContent);
  });
});

it('should show 404 error', async () => {
  const mockFind = jest.fn().mockRejectedValue(new AcousticContentNotFoundError());
  mockService = { find: mockFind };

  await act(async () => {
    render(
      <Article articleService={mockService} params={mockParams} />,
      container
    );
  });

  const error = container.querySelector('.not-found-error');
  expect(error).toBeTruthy();
});

it('should show unexpected error', async () => {
  const mockFind = jest.fn().mockRejectedValue(new AcousticContentUnexpectedError());
  mockService = { find: mockFind };

  await act(async () => {
    render(
      <Article articleService={mockService} params={mockParams} />,
      container
    );
  });

  const error = container.querySelector('.unexpected-error');
  expect(error).toBeTruthy();
});

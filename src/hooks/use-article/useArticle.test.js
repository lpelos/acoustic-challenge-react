import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import useArticle from './useArticle';

const mockParams = {
  contentHubId: '73c62a8f-06c5-4e95-a23c-b7ec0c9e428e',
  contentId: '60da4048-05f1-46ef-8f61-51cd88c2cc3b',
};

const MockComponent = ({ articleService, params }) => {
  const { contentHubId, contentId } = params;
  const { article, error, isLoading } = useArticle({
    articleService,
    contentHubId,
    contentId,
  });

  if (isLoading) { return 'loading'; }
  if (error) { return 'error'; }
  if (article) { return 'article'; }
  return null;
};

let container;
let mockService;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);

  const mockFind = jest.fn().mockResolvedValue('an important Article');
  mockService = { find: mockFind };
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  mockService = null;
});

it('renders without crashing', async () => {
  await act(async () => {
    render(
      <MockComponent articleService={mockService} params={mockParams} />,
      container
    );
  });
});

it('should fetch an article', async () => {
  await act(async () => {
    render(
      <MockComponent articleService={mockService} params={mockParams} />,
      container
    );
  })

  expect(mockService.find).toHaveBeenCalledTimes(1);
  expect(mockService.find).toHaveBeenCalledWith(mockParams);
});

it('should return an article', async () => {
  await act(async () => {
    render(
      <MockComponent articleService={mockService} params={mockParams} />,
      container
    );
  });

  expect(container.textContent).toBe('article');
});

it('should return an error', async () => {
  const mockFind = jest.fn().mockRejectedValue('something wrong');
  mockService = { find: mockFind };

  await act(async () => {
    render(
      <MockComponent articleService={mockService} params={mockParams} />,
      container
    );
  });

  expect(container.textContent).toBe('error');
});

it('should return if it is loading', async () => {
  let resolver;
  const promise = new Promise(r => resolver = r);
  const mockFind = jest.fn().mockReturnValue(promise);
  mockService = { find: mockFind };

  await act(async () => {
    render(
      <MockComponent articleService={mockService} params={mockParams} />,
      container
    );
  });

  expect(container.textContent).toBe('loading');

  await act(async () => { resolver('a resolved Article'); });

  expect(container.textContent).not.toBe('loading');
});

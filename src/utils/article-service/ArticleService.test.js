import mockContent from '../acoustic-content-client/acoustic-content-mock';
import ArticleService from './ArticleService';
import Article from '../Article';

const mockMainImageUrl = 'http://lorempixel.com/400/200/';

let mockClient;
let service;

beforeEach(() => {
  const mockContentItem = jest.fn().mockResolvedValue(mockContent);
  const mockResourceUrl = jest.fn().mockReturnValue(mockMainImageUrl);

  mockClient = { contentItem: mockContentItem, resourceUrl: mockResourceUrl };
  service = new ArticleService({ client: mockClient });
});

it('should initialize without crashing', () => {
  expect(service).toBeTruthy();
});

describe('#find', () => {
  it('should call the client and return an Article for the received content data', async () => {
    const mockContentHubId = 'ed8f0be9-8d1d-42bf-b9d6-014669de9aef';
    const mockContentId = '966d4130-6365-4cda-ae54-0719e2edb076';

    const article = await service.find({
      contentHubId: mockContentHubId,
      contentId: mockContentId,
    });

    expect(mockClient.contentItem).toHaveBeenCalledTimes(1);
    expect(mockClient.contentItem).toHaveBeenCalledWith(mockContentHubId, mockContentId);

    expect(article).toBeTruthy();
    expect(article).toBeInstanceOf(Article);
    expect(article.author).toEqual('Leeroy Jenkins');
    expect(article.body).toEqual(['<p>LEEEEEEEEEERROOOOOOOOOOY</p>', '<p>JEEENKINNNNSSSS</p>']);
    expect(article.date).toEqual(new Date('2009-04-30T13:05:00Z'));
    expect(article.heading).toEqual('YOLO');
    expect(article.id).toEqual('60da4048-05f1-46ef-8f61-51cd88c2cc3b');

    expect(article.mainImage).toBeTruthy();
    expect(article.mainImage.caption).toEqual('Rookery, Upper Blackrock Spire');
    expect(article.mainImage.credit).toEqual('the Internetz');
    expect(article.mainImage.url).toEqual(mockMainImageUrl);
  });
});

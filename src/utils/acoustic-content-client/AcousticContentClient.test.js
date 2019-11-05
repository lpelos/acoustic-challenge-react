import AcousticContentClient from "./AcousticContentClient";
import mockContent from "./acoustic-content-mock";

jest.mock('axios', () => () => Promise.resolve({ data: mockContent }));

const mockContentHubId = '3dcf776b-6f21-47fa-839d-f741bc6652bb';
const mockContentId = '60da4048-05f1-46ef-8f61-51cd88c2cc3b';

let service;

beforeEach(() => {
  service = new AcousticContentClient();
});

it('should initialize without crashing', () => {
  expect(service).toBeTruthy();
});

describe('#contentItem', () => {
  it('should return a Promise of the content data', async () => {
    const content = await service.contentItem(mockContentHubId, mockContentId);
    expect(content).toEqual(mockContent);
  });
});

describe('#resourceUrl', () => {
  it('should return the resource URL', () => {
    const mockResourcePath = '/3dcf776b-6f21-47fa-839d-f741bc6652bb/dxresources/b7e0/b7e0f80752ea5bb4eeb998004a41ad36.jpg';
    const mockResourceUrl = 'https://my12.digitalexperience.ibm.com/3dcf776b-6f21-47fa-839d-f741bc6652bb/dxresources/b7e0/b7e0f80752ea5bb4eeb998004a41ad36.jpg';
    const url = service.resourceUrl(mockResourcePath);
    expect(url).toEqual(mockResourceUrl);
  });
});

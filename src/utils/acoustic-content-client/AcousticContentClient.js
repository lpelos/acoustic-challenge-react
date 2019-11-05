import axios from 'axios';

import AcousticContentNotFoundError from './AcousticContentNotFoundError';
import AcousticContentUnexpectedError from './AcousticContentUnexpectedError';

const API_SCOPE = 'api';
const API_VERSION = 'v1';
const BASE_URL = 'https://my12.digitalexperience.ibm.com';

class AcousticContentClient {
  contentItem(contentHubId, contentId) {
    const url = contentItemUrl(contentHubId, contentId);

    return request(url).then(
      response => response.data,
      err => {
        const status = err && err.response && err.response.status;
        switch (status) {
          case 404: return Promise.reject(new AcousticContentNotFoundError());
          default: return Promise.reject(new AcousticContentUnexpectedError());
        }
      },
    );
  }

  resourceUrl(resourceUrl) {
    return url([resourceUrl]);
  }
}

function apiUrl(components) {
  return url([API_SCOPE, ...components]);
}

function contentItemUrl(contentHubId, contentId) {
  return apiUrl([contentHubId, 'delivery', API_VERSION, 'content', contentId]);
}

function request(url, opt = {}) {
  return axios({
    method: opt.method || 'get',
    url,
  });
}

function joinUrl(components) {
  return components.filter(Boolean).map((c, i) => {
    return i === 0 ? stripAfterSlash(c) : stripTrailingSlashes(c);
  }).join('/');
}

function stripAfterSlash(str) {
  return str.replace(/\/$/, '');
}

function stripTrailingSlashes(str) {
  return stripAfterSlash(str).replace(/^\//, '');
}

function url(components) {
  return joinUrl([BASE_URL, ...components]);
}

export default AcousticContentClient;

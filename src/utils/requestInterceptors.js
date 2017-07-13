import { pushRedirectChain, receiveInterceptedResponse } from 'store/request/actions';

const browser = window.browser || window.chrome;

/** We need to ignore fonts and resources not initiated by the user */
const blacklistedUrls = [
  'https://fonts.gstatic.com/s/opensans/v14/PRmiXeptR36kaC0GEAetxvR_54zmj3SbGZQh3vCOwvY.woff',
  'https://fonts.gstatic.com/s/opensans/v14/k3k702ZOKiLJc3WVjuplzKRDOzjiPcYnFooOUGCOsRk.woff',
  'https://fonts.gstatic.com/s/opensans/v14/cJZKeOuBrn4kERxqtaUH3bO3LdcAZYWl9Si6vvxL-qU.woff',
  'https://fonts.gstatic.com/s/opensans/v14/DXI1ORHCpsQm3Vp6mXoaTaRDOzjiPcYnFooOUGCOsRk.woff',
];

const beforeRedirectInterceptor = ({ getState, dispatch }) => response => {
  const state = getState();
  const lastRequestTime = state.request.lastRequestTime;

  dispatch(pushRedirectChain({
    ...response,
    time: response.timeStamp - lastRequestTime,
  }));
};

const completedInterceptor = ({ getState, dispatch }) => response => {
  // Ignore fonts and other stuff not initiated by the user
  if ((response.originUrl && !response.originUrl.includes('dist/index.html'))
  || blacklistedUrls.includes(response.url)) {
    return;
  }

  const state = getState();
  const lastRequestTime = state.request.lastRequestTime;

  dispatch(receiveInterceptedResponse({
    ...response,
    time: response.timeStamp - lastRequestTime,
  }));
};

// eslint-disable-next-line import/prefer-default-export
export const initializeInterceptors = store => {
  // Use chrome.tabs without promises for cross-browser support
  chrome.tabs.getCurrent(currentTab => {
    browser.webRequest.onBeforeRedirect.addListener(
      beforeRedirectInterceptor(store),
      { urls: ['<all_urls>'], tabId: currentTab.id },
      ['responseHeaders'],
    );

    browser.webRequest.onCompleted.addListener(
      completedInterceptor(store),
      { urls: ['<all_urls>'], tabId: currentTab.id },
      ['responseHeaders'],
    );
  });
};


import reducer from 'store/request/reducer';
import * as types from 'store/request/types';

describe('reducer', () => {
  const response = {
    url: 'foo',
    status: 404,
  };

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {}),
    ).toEqual({
      placeholderUrl: 'https://example.com',
      request: null,
      response: null,
      interceptedResponse: null,
      redirectChain: [],
      lastRequestTime: null,
      loading: false,
    });
  });

  it('should handle EXECUTE_REQUEST', () => {
    expect(
      reducer(undefined, {
        type: types.EXECUTE_REQUEST,
        lastRequestTime: 1482363367071,
      }),
    ).toEqual({
      placeholderUrl: 'https://example.com',
      request: null,
      response: null,
      interceptedResponse: null,
      redirectChain: [],
      lastRequestTime: 1482363367071,
      loading: true,
    });
  });

  it('should handle RECEIVE_RESPONSE', () => {
    expect(
      reducer(undefined, {
        type: types.RECEIVE_RESPONSE,
        response,
      }),
    ).toEqual({
      placeholderUrl: 'https://example.com',
      request: null,
      response,
      interceptedResponse: null,
      redirectChain: [],
      lastRequestTime: null,
      loading: false,
    });
  });

  it('should handle RECEIVE_INTERCEPTED_RESPONSE', () => {
    expect(
      reducer(undefined, {
        type: types.RECEIVE_INTERCEPTED_RESPONSE,
        response,
      }),
    ).toEqual({
      placeholderUrl: 'https://example.com',
      request: null,
      response: null,
      interceptedResponse: response,
      redirectChain: [],
      lastRequestTime: null,
      loading: false,
    });
  });

  it('should handle PUSH_REDIRECT_CHAIN', () => {
    expect(
      reducer(undefined, {
        type: types.PUSH_REDIRECT_CHAIN,
        response,
      }),
    ).toEqual({
      placeholderUrl: 'https://example.com',
      request: null,
      response: null,
      interceptedResponse: null,
      redirectChain: [response],
      lastRequestTime: 1482363367071, // Date.now mock
      loading: false,
    });
  });

  it('should handle CLEAR_RESPONSE', () => {
    expect(
      reducer(undefined, {
        type: types.CLEAR_RESPONSE,
      }),
    ).toEqual({
      placeholderUrl: 'https://example.com',
      request: null,
      response: null,
      interceptedResponse: null,
      redirectChain: [],
      lastRequestTime: null,
      loading: false,
    });
  });

  it('should handle REQUEST_FAILED', () => {
    const error = new Error('It failed!');

    expect(
      reducer(undefined, {
        type: types.REQUEST_FAILED,
        error,
      }),
    ).toEqual({
      placeholderUrl: 'https://example.com',
      request: null,
      response: null,
      interceptedResponse: null,
      redirectChain: [],
      lastRequestTime: null,
      loading: false,
      error,
    });
  });
});


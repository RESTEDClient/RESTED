import reducer from 'store/request/reducer';
import * as types from 'store/request/types';

describe('reducer', () => {
  let response;

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
});


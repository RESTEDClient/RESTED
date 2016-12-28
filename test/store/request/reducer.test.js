/* eslint-disable import/no-unresolved */
import reducer from 'store/request/reducer';
import * as types from 'store/request/types';

describe('reducer', () => {
  let request;
  let response;

  beforeEach(() => {
    request = {
      method: 'GET',
      headers: [{ name: 'test', value: 'blah' }],
      cache: false,
      url: 'http://www.aperturescience.com',
    };
    request = {
      method: 'GET',
      headers: [{ name: 'test', value: 'blah' }],
      cache: false,
      url: 'http://www.aperturescience.com',
    };
  });

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {}),
    ).toEqual({
      placeholderUrl: 'https://example.com',
      request: null,
      response: null,
      loading: false,
      useFormData: true,
    });
  });

  it('should handle EXECUTE_REQUEST', () => {
    expect(
      reducer(undefined, {
        type: types.EXECUTE_REQUEST,
      }),
    ).toEqual({
      placeholderUrl: 'https://example.com',
      request: null,
      response: null,
      loading: true,
      useFormData: true,
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
      loading: false,
      useFormData: true,
    });
  });

  it('should handle UPDATE_REQUEST', () => {
    expect(
      reducer(undefined, {
        type: types.UPDATE_REQUEST,
        request,
      }),
    ).toEqual({
      placeholderUrl: 'https://example.com',
      request,
      response: null,
      loading: false,
      useFormData: true,
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
      loading: false,
      useFormData: true,
    });
  });

  it('should handle USE_FORM_DATA', () => {
    expect(
      reducer(undefined, {
        type: types.USE_FORM_DATA,
        useFormData: true,
      }),
    ).toEqual({
      placeholderUrl: 'https://example.com',
      request: null,
      response: null,
      loading: false,
      useFormData: true,
    });

    expect(
      reducer(undefined, {
        type: types.USE_FORM_DATA,
        useFormData: false,
      }),
    ).toEqual({
      placeholderUrl: 'https://example.com',
      request: null,
      response: null,
      loading: false,
      useFormData: false,
    });
  });
});


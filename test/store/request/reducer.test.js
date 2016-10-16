/* eslint-disable import/no-unresolved */
import reducer from 'store/request/reducer';
import * as actions from 'store/request/actions';

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
      reducer(undefined, {})
    ).toEqual({
      request: null,
      response: null,
      loading: false,
    });
  });

  it('should handle EXECUTE_REQUEST', () => {
    expect(
      reducer(undefined, {
        type: actions.EXECUTE_REQUEST,
      })
    ).toEqual({
      request: null,
      response: null,
      loading: true,
    });
  });

  it('should handle RECEIVE_RESPONSE', () => {
    expect(
      reducer(undefined, {
        type: actions.RECEIVE_RESPONSE,
        response,
      })
    ).toEqual({
      request: null,
      response,
      loading: false,
    });
  });

  it('should handle UPDATE_REQUEST', () => {
    expect(
      reducer(undefined, {
        type: actions.UPDATE_REQUEST,
        request,
      })
    ).toEqual({
      request,
      response: null,
      loading: false,
    });
  });

  it('should handle CLEAR_RESPONSE', () => {
    expect(
      reducer(undefined, {
        type: actions.CLEAR_RESPONSE,
      })
    ).toEqual({
      request: null,
      response: null,
      loading: false,
    });
  });
});


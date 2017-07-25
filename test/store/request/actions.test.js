import * as actions from 'store/request/actions';
import * as types from 'store/request/types';

describe('actions', () => {
  let request;
  let response;

  beforeEach(() => {
    request = {
      method: 'GET',
      headers: [{ name: 'test', value: 'blah' }],
      cache: false,
      url: 'http://www.aperturescience.com',
    };
    response = {
      method: 'GET',
      headers: [{ name: 'test', value: 'blah' }],
      cache: false,
      url: 'http://www.aperturescience.com',
    };
  });

  it('should create an action to execute a request', () => {
    const expectedAction = {
      type: types.EXECUTE_REQUEST,
      lastRequestTime: 1482363367071,
    };

    expect(actions.executeRequest()).toEqual(expectedAction);
  });

  it('should create an action to receive a response', () => {
    const expectedAction = {
      type: types.RECEIVE_RESPONSE,
      response,
    };

    expect(actions.receiveResponse(response)).toEqual(expectedAction);
  });

  it('should create an action to clear the request', () => {
    const expectedAction = {
      type: types.CLEAR_RESPONSE,
    };

    expect(actions.clearRequest()).toEqual(expectedAction);
  });

  it('should create an action to change body type', () => {
    let expectedAction = {
      type: types.CHANGE_BODY_TYPE,
      bodyType: 'json',
    };

    expect(actions.changeBodyType('json')).toEqual(expectedAction);

    expectedAction = {
      type: types.CHANGE_BODY_TYPE,
      bodyType: 'custom',
    };

    expect(actions.changeBodyType('custom')).toEqual(expectedAction);
  });

  it('should an action to send a request', () => {
    const expectedAction = {
      type: types.SEND_REQUEST,
      request,
    };

    expect(actions.sendRequest(request)).toEqual(expectedAction);
  });
});


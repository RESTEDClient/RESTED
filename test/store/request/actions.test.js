/* eslint-disable import/no-unresolved */
import * as actions from 'store/request/actions';

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
      type: actions.EXECUTE_REQUEST,
    };

    expect(actions.executeRequest()).toEqual(expectedAction);
  });

  it('should create an action to receive a response', () => {
    const expectedAction = {
      type: actions.RECEIVE_RESPONSE,
      response,
    };

    expect(actions.receiveResponse(response)).toEqual(expectedAction);
  });

  it('should create an action to update the request', () => {
    const expectedAction = {
      type: actions.UPDATE_REQUEST,
      request,
    };

    expect(actions.updateRequest(request)).toEqual(expectedAction);
  });

  it('should create an action to clear the request', () => {
    const expectedAction = {
      type: actions.CLEAR_RESPONSE,
    };

    expect(actions.clearRequest()).toEqual(expectedAction);
  });
});


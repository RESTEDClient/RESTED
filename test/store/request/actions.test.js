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

  it('should create an action to set useFormData', () => {
    let expectedAction = {
      type: types.USE_FORM_DATA,
      useFormData: true,
    };

    expect(actions.setUseFormData(true)).toEqual(expectedAction);

    expectedAction = {
      type: types.USE_FORM_DATA,
      useFormData: false,
    };

    expect(actions.setUseFormData(false)).toEqual(expectedAction);
  });

  it('should an action to send a request', () => {
    const expectedAction = {
      type: types.SEND_REQUEST,
      request,
    };

    expect(actions.sendRequest(request)).toEqual(expectedAction);
  });
});


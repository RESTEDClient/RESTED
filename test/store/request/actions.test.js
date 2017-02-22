import Immutable from 'immutable';
import { change } from 'redux-form';

/* eslint-disable import/no-unresolved */
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

  it('should create an action to update the request', () => {
    const expectedAction = {
      type: types.UPDATE_REQUEST,
      request,
    };

    expect(actions.updateRequest(request)).toEqual(expectedAction);
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

  describe('sendRequest', () => {
    it('should dispatch EXECUTE_REQUEST when it is called', () => {
      const payload = {};
      const mockState = {
        request: {},
        url: 'http://mozilla.com',
        urlVariables: Immutable.Map(),
      };

      const dispatch = jest.fn(() => {});
      const getState = jest.fn(() => mockState);

      // Mock Headers and fetch
      window.Headers = jest.fn(d => d);
      window.fetch = () => new Promise(() => {});

      actions.sendRequest(payload)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith({
        type: 'request/EXECUTE_REQUEST',
      });
    });

    it('should send use a fallback URL when none is provided', () => {
      const payload = {};
      const mockState = {
        request: {
          placeholderUrl: 'http://fallbackUrl.com',
        },
        urlVariables: Immutable.Map(),
      };

      const dispatch = jest.fn(() => {});
      const getState = jest.fn(() => mockState);

      // Mock Headers and fetch
      window.Headers = jest.fn(d => d);
      window.fetch = () => new Promise(() => {});

      actions.sendRequest(payload)(dispatch, getState);

      expect(getState).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(change(
        'request',               // Redux store to be updated
        'url',                   // Field to be updated
        'http://fallbackUrl.com', // Value
      ));
    });

    it('should call window.fetch with the given payload', () => {
      const payload = {
        url: 'http://mozilla.com',
        method: 'PUT',
        headers: [{
          name: 'foo',
          value: 'bar',
        }, {
          name: 'qrux',
          value: 'qwerp',
        }],
        formData: [{
          name: 'foo',
          value: 'bar',
        }, {
          name: 'qrux',
          value: 'qwerp',
        }],
      };

      const mockState = {
        request: {
          placeholderUrl: 'http://fallbackUrl.com',
        },
        urlVariables: Immutable.Map(),
      };

      const expectedData = new FormData();
      expectedData.append(payload.formData[0].name, payload.formData[0].value);
      expectedData.append(payload.formData[1].name, payload.formData[1].value);

      // Mock Headers and fetch
      window.Headers = jest.fn(d => d);
      const fetch = window.fetch = jest.fn(() => new Promise(() => {}));

      actions.sendRequest(payload)(jest.fn(), jest.fn(() => mockState));

      expect(fetch).toHaveBeenCalledWith(payload.url, {
        credentials: 'include',
        method: 'PUT',
        body: expectedData,
        headers: { // This is not realistic, as we are mocking window.Headers
          foo: 'bar',
          qrux: 'qwerp',
        },
      });
    });
  });
});


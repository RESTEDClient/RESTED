import { change } from 'redux-form';

/* eslint-disable import/no-unresolved */
import * as actions from 'store/collections/actions';
import * as types from 'store/collections/types';

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
  });

  it('should create an action to add a request', () => {
    const expectedAction = {
      type: types.ADD_REQUEST,
      collectionId: 'test-collection',
      request,
    };

    expect(actions.addRequest(request, 'test-collection')).toEqual(expectedAction);
  });

  it('should create an action to reorder a request within a collection', () => {
    const expectedAction = {
      type: types.REORDER_REQUEST,
      collectionId: 'collection_id',
      requestId: 'request_id',
      order: 3,
    };

    expect(actions.reorderRequest('request_id', 'collection_id', 3)).toEqual(expectedAction);
  });

});


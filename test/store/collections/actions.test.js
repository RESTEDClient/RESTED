import * as actions from 'store/collections/actions';
import * as types from 'store/collections/types';

describe('actions', () => {
  let request;

  beforeEach(() => {
    request = {
      method: 'GET',
      headers: [{ name: 'test', value: 'blah' }],
      cache: false,
      url: 'http://www.aperturescience.com',
    };
  });

  it('should create an action to start fetching collections', () => {
    const expectedAction = {
      type: types.FETCH_REQUESTED,
    };

    expect(actions.fetchCollections()).toEqual(expectedAction);
  });

  it('should create an action to receive collections', () => {
    const collections = [{
      requests: [request],
    }];
    const expectedAction = {
      type: types.RECEIVE_COLLECTIONS,
      collections,
    };

    expect(actions.receiveCollections(collections)).toEqual(expectedAction);
  });

  it('should create an action to fetch collections', () => {
    const expectedAction = {
      type: types.FETCH_REQUESTED,
    };

    expect(actions.fetchCollections()).toEqual(expectedAction);
  });

  it('should create an action to add a collection', () => {
    const expectedAction = {
      type: types.ADD_COLLECTION_REQUESTED,
    };

    expect(actions.addCollection()).toEqual(expectedAction);
  });

  it('should create an action to delete a collection', () => {
    const expectedAction = {
      type: types.DELETE_COLLECTION_REQUESTED,
      collectionId: 'foo',
    };

    expect(actions.deleteCollection('foo')).toEqual(expectedAction);
  });

  it('should create an action to add a request', () => {
    const expectedAction = {
      type: types.ADD_REQUEST_REQUESTED,
      collectionIndex: 2,
      request,
    };

    expect(actions.addRequest(request, 2)).toEqual(expectedAction);
  });

  it('should create an action to delete a request', () => {
    const expectedAction = {
      type: types.DELETE_REQUEST_REQUESTED,
      collectionIndex: 2,
      requestId: 1,
    };

    expect(actions.deleteRequest(1, 2)).toEqual(expectedAction);
  });

  it('should create an action to reorder a request', () => {
    const source = {
      collectionIndex: 1,
      requestIndex: 1,
    };
    const target = {
      collectionIndex: 0,
      requestIndex: 0,
    };
    const expectedAction = {
      type: types.REORDER_REQUEST_REQUESTED,
      source,
      target,
    };

    expect(actions.reorderRequest(source, target)).toEqual(expectedAction);
  });

  it('should create an action to reorder a collection', () => {
    const oldIndex = 0;
    const newIndex = 1;
    const expectedAction = {
      type: types.REORDER_COLLECTION_REQUESTED,
      oldIndex,
      newIndex,
    };

    expect(actions.reorderCollection(oldIndex, newIndex)).toEqual(expectedAction);
  });

  it('should create an action to rename a collection', () => {
    const collectionIndex = 1;
    const name = 'Test';
    const expectedAction = {
      type: types.RENAME_COLLECTION_REQUESTED,
      collectionIndex,
      name,
    };

    expect(actions.renameCollection(collectionIndex, name)).toEqual(expectedAction);
  });

  it('should create an action to rename a request', () => {
    const collectionIndex = 1;
    const requestIndex = 0;
    const name = 'Test';
    const expectedAction = {
      type: types.RENAME_REQUEST_REQUESTED,
      collectionIndex,
      requestIndex,
      name,
    };

    expect(actions.renameRequest(collectionIndex, requestIndex, name)).toEqual(expectedAction);
  });
});


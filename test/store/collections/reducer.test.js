import Immutable from 'immutable';

/* eslint-disable import/no-unresolved */
import reducer from 'store/collections/reducer';
import * as types from 'store/collections/types';

describe('reducer', () => {
  let collections;
  let request;
  let request2;

  beforeEach(() => {
    collections = [{
      name: 'Collection',
      id: 'some-collection-UUID',
      minimized: true,
      requests: [],
    }, {
      name: 'Collection 2',
      id: 'some-collection-UUID2',
      minimized: true,
      requests: [],
    }];

    request = {
      id: 'some-request-UUID',
      url: 'www.vg.no',
      method: 'POST',
      data: '',
      useFormData: true,
      formData: [
        {
          name: 'BodyOfPOST...',
          value: '...SentViaFormData',
        },
      ],
      headers: [
        {
          name: 'Content-Type',
          value: 'angular/awesomeness',
        },
      ],
    };
    request2 = {
      id: 'some-request-UUID2',
      url: 'www.reddit.com',
      method: 'GET',
      data: '',
      useFormData: true,
      formData: [],
      headers: [
        {
          name: 'Content-Type',
          value: 'react/awesomeness',
        },
      ],
    };
  });

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {}).toJSON(),
    ).toEqual({
      isFetching: false,
      collections: [],
    });
  });

  it('should handle FETCH_COLLECTIONS', () => {
    const initialState = Immutable.fromJS({
      collections: [],
      isFetching: false,
    });

    expect(
      reducer(initialState, {
        type: types.FETCH_COLLECTIONS,
      }).toJSON(),
    ).toEqual({
      isFetching: true,
      collections: [],
    });
  });

  it('should handle RECEIVE_COLLECTIONS', () => {
    const initialState = Immutable.fromJS({
      collections: [],
      isFetching: true,
    });

    expect(
      reducer(initialState, {
        type: types.RECEIVE_COLLECTIONS,
        collections,
      }).toJSON(),
    ).toEqual({
      isFetching: false,
      collections,
    });
  });

  it('should handle ADD_COLLECTION', () => {
    const initialState = Immutable.fromJS({
      isFetching: false,
      collections: [],
    });

    expect(
      reducer(initialState, {
        type: types.ADD_COLLECTION,
      }).toJSON(),
    ).toEqual({
      isFetching: false,
      collections: [{
        name: 'Collection',
        id: 'test-id',
        minimized: false,
        requests: [],
      }],
    });
  });

  it('should handle DELETE_COLLECTION', () => {
    const initialState = Immutable.fromJS({
      isFetching: false,
      collections,
    });

    expect(
      reducer(initialState, {
        type: types.DELETE_COLLECTION,
        collectionId: 'some-collection-UUID',
      }).toJSON(),
    ).toEqual({
      isFetching: false,
      collections: [{
        name: 'Collection 2',
        id: 'some-collection-UUID2',
        minimized: true,
        requests: [],
      }],
    });
  });

  it('should handle ADD_REQUEST', () => {
    const initialState = Immutable.fromJS({
      isFetching: false,
      collections,
    });

    expect(
      reducer(initialState, {
        type: types.ADD_REQUEST,
        request,
        collectionIndex: 1,
      }).toJSON(),
    ).toEqual({
      isFetching: false,
      collections: [{
        name: 'Collection',
        id: 'some-collection-UUID',
        minimized: true,
        requests: [],
      }, {
        name: 'Collection 2',
        id: 'some-collection-UUID2',
        minimized: true,
        requests: [request],
      }],
    });
  });

  it('should handle DELETE_REQUEST', () => {
    const initialState = Immutable.fromJS({
      isFetching: false,
      collections: [{
        name: 'Collection',
        id: 'some-collection-UUID',
        minimized: true,
        requests: [request, request2],
      }, {
        name: 'Collection 2',
        id: 'some-collection-UUID2',
        minimized: true,
        requests: [],
      }],
    });

    expect(
      reducer(initialState, {
        type: types.DELETE_REQUEST,
        requestId: 'some-request-UUID',
        collectionIndex: 0,
      }).toJSON(),
    ).toEqual({
      isFetching: false,
      collections: [{
        name: 'Collection',
        id: 'some-collection-UUID',
        minimized: true,
        requests: [request2],
      }, {
        name: 'Collection 2',
        id: 'some-collection-UUID2',
        minimized: true,
        requests: [],
      }],
    });
  });

  it('should handle REORDER_REQUEST within a collection', () => {
    const otherRequest = {
      id: 'some-other-request-UUID',
      url: 'www.reddit.com',
      method: 'POST',
      data: '',
      useFormData: true,
      formData: [
        {
          name: 'BodyOfPOST...',
          value: '...SentViaFormData',
        },
      ],
      headers: [
        {
          name: 'Content-Type',
          value: 'angular/awesomeness',
        },
      ],
    };

    const initialState = Immutable.fromJS({
      isFetching: false,
      collections: [{
        name: 'Collection',
        id: 'some-collection-UUID',
        minimized: true,
        requests: [],
      }, {
        name: 'Collection 2',
        id: 'some-collection-UUID2',
        minimized: true,
        requests: [otherRequest, request],
      }],
    });

    expect(
      reducer(initialState, {
        type: types.REORDER_REQUEST,
        source: {
          collectionIndex: 1,
          requestIndex: 1,
        },
        target: {
          collectionIndex: 1,
          requestIndex: 0,
        },
      }).toJSON(),
    ).toEqual({
      isFetching: false,
      collections: [
        {
          name: 'Collection',
          id: 'some-collection-UUID',
          minimized: true,
          requests: [],
        }, {
          name: 'Collection 2',
          id: 'some-collection-UUID2',
          minimized: true,
          requests: [request, otherRequest],
        }],
    });
  });

  it('should handle REORDER_REQUEST between two collections', () => {
    const otherRequest = {
      id: 'some-other-request-UUID',
      url: 'www.reddit.com',
      method: 'POST',
      data: '',
      useFormData: true,
      formData: [
        {
          name: 'BodyOfPOST...',
          value: '...SentViaFormData',
        },
      ],
      headers: [
        {
          name: 'Content-Type',
          value: 'angular/awesomeness',
        },
      ],
    };

    const initialState = Immutable.fromJS({
      isFetching: false,
      collections: [{
        name: 'Collection',
        id: 'some-collection-UUID',
        minimized: true,
        requests: [otherRequest],
      }, {
        name: 'Collection 2',
        id: 'some-collection-UUID2',
        minimized: true,
        requests: [request, otherRequest, request],
      }],
    });

    expect(
      reducer(initialState, {
        type: types.REORDER_REQUEST,
        source: {
          collectionIndex: 1,
          requestIndex: 0,
        },
        target: {
          collectionIndex: 0,
          requestIndex: 1,
        },
      }).toJSON(),
    ).toEqual({
      isFetching: false,
      collections: [
        {
          name: 'Collection',
          id: 'some-collection-UUID',
          minimized: true,
          requests: [otherRequest, request],
        }, {
          name: 'Collection 2',
          id: 'some-collection-UUID2',
          minimized: true,
          requests: [otherRequest, request],
        }],
    });
  });

  it('should handle REORDER_COLLECTION', () => {
    const initialState = Immutable.fromJS({
      isFetching: false,
      collections: [{
        name: 'Collection',
        id: 'some-collection-UUID',
        minimized: true,
        requests: [],
      }, {
        name: 'Collection 2',
        id: 'some-collection-UUID2',
        minimized: true,
        requests: [],
      }],
    });

    expect(
      reducer(initialState, {
        isFetching: false,
        type: types.REORDER_COLLECTION,
        oldIndex: 0,
        newIndex: 1,
      }).toJSON(),
    ).toEqual({
      isFetching: false,
      collections: [{
        name: 'Collection 2',
        id: 'some-collection-UUID2',
        minimized: true,
        requests: [],
      }, {
        name: 'Collection',
        id: 'some-collection-UUID',
        minimized: true,
        requests: [],
      }],
    });
  });

  it('should handle RENAME_REQUEST', () => {
    const initialState = Immutable.fromJS({
      isFetching: false,
      collections: [{
        name: 'Collection',
        id: 'some-collection-UUID',
        minimized: true,
        requests: [{
          url: 'http://foo.com',
          method: 'POST',
          name: 'Update it',
        }, {
          url: 'http://foo.com',
          method: 'GET',
          name: 'Fetch it',
        }],
      }, {
        name: 'Collection 2',
        id: 'some-collection-UUID2',
        minimized: true,
        requests: [],
      }],
    });

    expect(
      reducer(initialState, {
        type: types.RENAME_REQUEST,
        collectionIndex: 0,
        requestIndex: 1,
        name: 'The new name',
      }).toJSON(),
    ).toEqual({
      isFetching: false,
      collections: [{
        name: 'Collection',
        id: 'some-collection-UUID',
        minimized: true,
        requests: [{
          url: 'http://foo.com',
          method: 'POST',
          name: 'Update it',
        }, {
          url: 'http://foo.com',
          method: 'GET',
          name: 'The new name',
        }],
      }, {
        name: 'Collection 2',
        id: 'some-collection-UUID2',
        minimized: true,
        requests: [],
      }],
    });
  });
});


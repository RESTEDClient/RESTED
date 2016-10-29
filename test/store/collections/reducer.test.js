/* eslint-disable import/no-unresolved */
import reducer from 'store/collections/reducer';
import * as types from 'store/collections/types';

describe('reducer', () => {
  let collections;
  let request;

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
          value: '...SentViaFormData'
        }
      ],
      headers: [
       {
         name: 'Content-Type',
         value: 'angular/awesomeness'
       }
      ]
    };
  });

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      collections: []
    });
  });

  it('should handle ADD_REQUEST', () => {
    const initialState = {
      collections,
    };

    expect(
      reducer(initialState, {
        type: types.ADD_REQUEST,
        request: request,
        collectionId: 'some-collection-UUID2',
      })
    ).toEqual({
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
      }]
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
          value: '...SentViaFormData'
        }
      ],
      headers: [
       {
         name: 'Content-Type',
         value: 'angular/awesomeness'
       }
      ]
    };

    const initialState = {
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
    };

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
      })
    ).toEqual({
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
          value: '...SentViaFormData'
        }
      ],
      headers: [
       {
         name: 'Content-Type',
         value: 'angular/awesomeness'
       }
      ]
    };

    const initialState = {
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
    };

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
      })
    ).toEqual({
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
    const initialState = {
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
    };

    expect(
      reducer(initialState, {
        type: types.REORDER_COLLECTION,
        oldIndex: 0,
        newIndex: 1,
      })
    ).toEqual({
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
});


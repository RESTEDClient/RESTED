import Immutable from 'immutable';
import {
  ADD_REQUEST,
  REORDER_REQUEST,
  REORDER_COLLECTION,
} from './types';

const initialState = Immutable.fromJS({
  // TODO Replace mock data with collections: []
  collections: [{
    name: 'Collection',
    id: 'some-collection-UUID',
    minimized: true,
    requests: [{
      id: 'some-request-UUID1',
      url: 'www.foo.no',
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
    }],
  }, {
    name: 'Collection 2',
    id: 'some-collection-UUID2',
    minimized: true,
    requests: [{
      id: 'some-request-UUID2',
      url: 'www.foo.no',
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
    }, {
      id: 'some-request-UUID3',
      url: 'www.bar.no',
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
    }, {
      id: 'some-request-UUID4',
      url: 'www.baz.no',
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
    }],
  }],
});

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_REQUEST:
      return state
        .updateIn([
          'collections',
          action.collectionIndex,
          'requests',
        ], requests => (
          requests.unshift(action.request)
        ));

    case REORDER_COLLECTION: {
      const collection = state.getIn([
        'collections',
        action.oldIndex,
      ]);

      return state
        .deleteIn([
          'collections',
          action.oldIndex,
        ])
        .update('collections', collections => (
          collections.insert(action.newIndex, collection)
        ));
    }

    case REORDER_REQUEST: {
      const request = state
        .getIn([
          'collections',
          action.source.collectionIndex,
          'requests',
          action.source.requestIndex,
        ]);

      return state
        .deleteIn([
          'collections',
          action.source.collectionIndex,
          'requests',
          action.source.requestIndex,
        ])
        .updateIn([
          'collections',
          action.target.collectionIndex,
          'requests',
        ], requests => (
          requests.insert(action.target.requestIndex, request)
        ));
    }

    default:
      return state;
  }
}


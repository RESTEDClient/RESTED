import { put, call, select } from 'redux-saga/effects';

import { updateRequestSaga, updateLocalStorage } from 'store/collections/sagas';
import * as types from 'store/collections/types';
import { getCollections } from 'store/collections/selectors';
import { toggleEditSaga } from 'store/config/sagas';
import getRequestIndexes from 'utils/getRequestIndexes';

const mockCollections = [];

const mockRequest = {
  id: 'UUID-FOOBAR',
  method: 'GET',
  url: 'http://visitnorway.com',
  headers: [{
    name: 'Foo',
    value: 'Bar',
  }],
  formData: [{
    name: 'Yes',
    value: 'Sir',
  }],
};

describe('fetchData saga', () => {
  describe('updateRequest saga', () => {
    const iterator = updateRequestSaga({ request: mockRequest });
    let result = iterator.next();

    it('should select the collections from state', () => {
      expect(result.value).toEqual(
        select(getCollections),
      );
      result = iterator.next(mockCollections);
    });

    it('should get the indexes of the request', () => {
      const mockResult = { collectionIndex: 0, requestIndex: 0 };
      expect(result.value).toEqual(
        call(getRequestIndexes, mockRequest.id, mockCollections),
      );
      result = iterator.next(mockResult);
    });

    it('should dispatch an update request action', () => {
      expect(result.value).toEqual(
        put({
          type: types.UPDATE_REQUEST,
          request: mockRequest,
          collectionIndex: 0,
          requestIndex: 0,
        }),
      );
      result = iterator.next();
    });

    it('should call toggle edit', () => {
      expect(result.value).toEqual(
        call(toggleEditSaga),
      );
      result = iterator.next();
    });

    it('should update local storage', () => {
      expect(result.value).toEqual(
        call(updateLocalStorage),
      );
      result = iterator.next();
    });

    it('should be done', () => {
      expect(result.done).toEqual(true);
    });
  });
});


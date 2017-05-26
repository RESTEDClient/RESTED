import { put, select } from 'redux-saga/effects';
import { initialize } from 'redux-form';

import { requestForm } from 'components/Request';
import { toggleEditSaga } from 'store/config/sagas';
import * as types from 'store/config/types';
import { isEditMode } from 'store/config/selectors';

const mockRequest = {
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

describe('toggleEdit saga', () => {
  describe('when switching to edit mode', () => {
    const iterator = toggleEditSaga({ request: mockRequest });

    it('should dispatch a toggle edit action', () => {
      expect(iterator.next().value).toEqual(put({
        type: types.TOGGLE_EDIT, request: mockRequest,
      }));
    });

    it('should get the current edit mode from state', () => {
      expect(iterator.next().value).toEqual(select(isEditMode));
    });

    it('should dispatch a redux initialize action', () => {
      expect(iterator.next(true).value).toEqual(put(
        initialize(requestForm, mockRequest),
      ));
    });

    it('should be finished', () => {
      expect(iterator.next().done).toEqual(true);
    });
  });

  describe('when switching away from edit mode', () => {
    const iterator = toggleEditSaga({ request: mockRequest });

    it('should dispatch a toggle edit action', () => {
      expect(iterator.next().value).toEqual(put({
        type: types.TOGGLE_EDIT, request: mockRequest,
      }));
    });

    it('should get the current edit mode from state', () => {
      expect(iterator.next().value).toEqual(select(isEditMode));
    });

    it('should be finished', () => {
      expect(iterator.next(false).done).toEqual(true);
    });
  });
});


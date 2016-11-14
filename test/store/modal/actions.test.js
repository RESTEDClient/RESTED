/* eslint-disable import/no-unresolved */
import * as actions from 'store/modal/actions';
import * as types from 'store/modal/types';

describe('actions', () => {
  it('should create an action to set modal data', () => {
    const data = {
      title: 'foo foo bar bar',
      body: 'yes no oui non',
    };
    const expectedAction = {
      type: types.SET_MODAL_DATA,
      data,
    };

    expect(actions.setModalData(data)).toEqual(expectedAction);
  });

  it('should create an action to remove the modal', () => {
    const expectedAction = {
      type: types.REMOVE_MODAL,
    };

    expect(actions.removeModal()).toEqual(expectedAction);
  });

  it('should create an action to show a "thrown error" modal', () => {
    const errorData = {
      success: false,
      message: 'An error occured when adding to database!',
      object: {
        isTrusted: true,
      },
    };

    const expectedAction = {
      type: types.THROW_ERROR,
      data: errorData,
    };

    expect(actions.throwError(errorData)).toEqual(expectedAction);
  });
});


/* eslint-disable import/no-unresolved */
import * as actions from 'redux/modal/actions';

describe('actions', () => {
  it('should create an action to set modal data', () => {
    const data = {
      title: 'foo foo bar bar',
      body: 'yes no oui non',
    };
    const expectedAction = {
      type: actions.SET_MODAL_DATA,
      data,
    };

    expect(actions.setModalData(data)).toEqual(expectedAction);
  });

  it('should create an action to remove the modal', () => {
    const expectedAction = {
      type: actions.REMOVE_MODAL,
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
      type: actions.THROW_ERROR,
      data: errorData,
    };

    expect(actions.throwError(errorData)).toEqual(expectedAction);
  });
});


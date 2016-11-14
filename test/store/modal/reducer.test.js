/* eslint-disable import/no-unresolved */
import reducer from 'store/modal/reducer';
import * as types from 'store/modal/types';

describe('reducer', () => {
  const dirtyState = {
    title: 'Something something title',
    body: '<h1>Foo bar boo boo fooo foo</h1>',
    visible: true,
  };

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      title: null,
      body: null,
      errorData: null,
      visible: false,
      cancelClick: null,
      actions: [],
    });
  });

  it('should handle SET_MODAL_DATA', () => {
    expect(
      reducer(undefined, {
        type: types.SET_MODAL_DATA,
        data: {
          title: 'foo foo bar bar',
          body: 'yes no oui non',
          cancelClick: null,
          actions: [],
        },
      })
    ).toEqual({
      title: 'foo foo bar bar',
      body: 'yes no oui non',
      errorData: null,
      visible: true,
      cancelClick: null,
      actions: [],
    });
  });

  it('should handle REMOVE_MODAL', () => {
    expect(
      reducer(dirtyState, {
        type: types.REMOVE_MODAL,
      })
    ).toEqual({
      title: null,
      body: null,
      errorData: null,
      visible: false,
      cancelClick: null,
      actions: [],
    });
  });

  it('should handle THROW_ERROR', () => {
    const errorData = {
      success: false,
      message: 'An error occured when adding to database!',
      object: {
        isTrusted: true,
      },
    };

    expect(
      reducer(undefined, {
        type: types.THROW_ERROR,
        data: errorData,
      })
    ).toEqual({
      title: 'Error!',
      body: 'Sorry, something went wrong.. If there is anything useful in a gray box below (or the web console), please create an issue on <a href="https://github.com/esphen/RESTED/issues" target="_blank">GitHub</a> with any relevant data you find. Remember to remove any sensitive data before posting.',
      errorData,
      visible: true,
      cancelClick: null,
      actions: [],
    });
  });
});


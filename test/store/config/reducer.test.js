/* eslint-disable import/no-unresolved */
import reducer from 'store/config/reducer';
import * as types from 'store/config/types';

describe('reducer', () => {
  const dirtyState = {
    headers: {
      expanded: true,
    },
    foo: {
      expanded: true,
    },
  };

  const defaultState = {
    requestBody: {
      expanded: true,
    },
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(defaultState);
  });

  it('should handle SET_EXPANDED', () => {
    expect(
      reducer(undefined, {
        type: types.SET_EXPANDED,
        id: 'foo',
      }),
    ).toEqual({
      ...defaultState,
      foo: {
        expanded: true,
      },
    });

    expect(
      reducer(undefined, {
        type: types.SET_EXPANDED,
        id: 'headers',
      }),
    ).toEqual({
      ...defaultState,
      headers: {
        expanded: true,
      },
    });
  });

  it('should handle SET_COLLAPSED', () => {
    expect(
      reducer(dirtyState, {
        type: types.SET_COLLAPSED,
        id: 'foo',
      }),
    ).toEqual({
      headers: {
        expanded: true,
      },
      foo: {
        expanded: false,
      },
    });

    expect(
      reducer(dirtyState, {
        type: types.SET_COLLAPSED,
        id: 'headers',
      }),
    ).toEqual({
      headers: {
        expanded: false,
      },
      foo: {
        expanded: true,
      },
    });
  });

  it('should handle TOGGLE_EDIT', () => {
    expect(
      reducer({ editingRequest: 'fooRequest' }, {
        type: types.TOGGLE_EDIT,
        request: 'fooRequest',
      }),
    ).toEqual({});

    expect(
      reducer({}, {
        type: types.TOGGLE_EDIT,
        request: 'fooRequest',
      }),
    ).toEqual({
      editingRequest: 'fooRequest',
    });
  });
});


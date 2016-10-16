/* eslint-disable import/no-unresolved */
import reducer from 'store/collapsable/reducer';
import * as actions from 'store/collapsable/actions';

describe('reducer', () => {
  const dirtyState = {
    headers: {
      expanded: true,
    },
    foo: {
      expanded: true,
    },
  };
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({});
  });

  it('should handle SET_EXPANDED', () => {
    expect(
      reducer(undefined, {
        type: actions.SET_EXPANDED,
        id: 'foo',
      })
    ).toEqual({
      foo: {
        expanded: true,
      },
    });

    expect(
      reducer(undefined, {
        type: actions.SET_EXPANDED,
        id: 'headers',
      })
    ).toEqual({
      headers: {
        expanded: true,
      },
    });
  });

  it('should handle SET_COLLAPSED', () => {
    expect(
      reducer(dirtyState, {
        type: actions.SET_COLLAPSED,
        id: 'foo',
      })
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
        type: actions.SET_COLLAPSED,
        id: 'headers',
      })
    ).toEqual({
      headers: {
        expanded: false,
      },
      foo: {
        expanded: true,
      },
    });
  });
});


/* eslint-disable import/no-unresolved */
import * as actions from 'store/collapsable/actions';
import * as types from 'store/collapsable/types';

describe('actions', () => {
  it('should create an action to set as expanded', () => {
    let id = 'headers';
    let expectedAction = {
      type: types.SET_EXPANDED,
      id,
    };

    expect(actions.expand(id)).toEqual(expectedAction);

    id = 'foo';
    expectedAction = {
      type: types.SET_EXPANDED,
      id,
    };

    expect(actions.expand(id)).toEqual(expectedAction);
  });

  it('should create an action to set as collapsed', () => {
    let id = 'headers';
    let expectedAction = {
      type: types.SET_COLLAPSED,
      id,
    };

    expect(actions.collapse(id)).toEqual(expectedAction);

    id = 'foo';
    expectedAction = {
      type: types.SET_COLLAPSED,
      id,
    };

    expect(actions.collapse(id)).toEqual(expectedAction);
  });

  it('should create an action to toggle modal as collapsed', () => {
    let id = 'headers';
    let expectedAction = {
      type: types.SET_COLLAPSED,
      id,
    };

    expect(actions.toggleCollapse(id, true)).toEqual(expectedAction);

    id = 'foo';
    expectedAction = {
      type: types.SET_EXPANDED,
      id,
    };

    expect(actions.toggleCollapse(id, false)).toEqual(expectedAction);
  });
});


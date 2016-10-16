/* eslint-disable import/no-unresolved */
import * as actions from 'redux/collapsable/actions';

describe('actions', () => {
  it('should create an action to set modal as expanded', () => {
    let id = 'headers';
    let expectedAction = {
      type: actions.SET_EXPANDED,
      id,
    };

    expect(actions.expand(id)).toEqual(expectedAction);

    id = 'foo';
    expectedAction = {
      type: actions.SET_EXPANDED,
      id,
    };

    expect(actions.expand(id)).toEqual(expectedAction);
  });

  it('should create an action to set modal as collapsed', () => {
    let id = 'headers';
    let expectedAction = {
      type: actions.SET_COLLAPSED,
      id,
    };

    expect(actions.collapse(id)).toEqual(expectedAction);

    id = 'foo';
    expectedAction = {
      type: actions.SET_COLLAPSED,
      id,
    };

    expect(actions.collapse(id)).toEqual(expectedAction);
  });
});


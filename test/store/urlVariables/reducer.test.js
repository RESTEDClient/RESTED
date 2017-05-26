import Immutable from 'immutable';

/* eslint-disable import/no-unresolved */
import reducer from 'store/urlVariables/reducer';
import * as types from 'store/urlVariables/types';

describe('reducer', () => {
  const urlVariables = [
    {
      name: 'foo',
      value: 'bar',
    }, {
      name: 'foo2',
      value: 'bar2',
    },
  ];

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {}).toJSON(),
    ).toEqual({
      isFetching: false,
      urlVariables: [],
    });
  });

  it('should handle FETCH_URL_VARIABLES', () => {
    const initialState = Immutable.fromJS({
      urlVariables: [],
      isFetching: false,
    });

    expect(
      reducer(initialState, {
        type: types.FETCH_URL_VARIABLES,
      }).toJSON(),
    ).toEqual({
      isFetching: true,
      urlVariables: [],
    });
  });

  it('should handle RECEIVE_URL_VARIABLES', () => {
    const initialState = Immutable.fromJS({
      urlVariables: [],
      isFetching: true,
    });

    expect(
      reducer(initialState, {
        type: types.RECEIVE_URL_VARIABLES,
        urlVariables,
      }).toJSON(),
    ).toEqual({
      isFetching: false,
      urlVariables,
    });
  });

  it('should handle ADD_URL_VARIABLE', () => {
    const initialState = Immutable.fromJS({
      isFetching: false,
      urlVariables,
    });

    expect(
      reducer(initialState, {
        type: types.ADD_URL_VARIABLE,
      }).toJSON(),
    ).toEqual({
      isFetching: false,
      urlVariables: [
        ...urlVariables,
        {},
      ],
    });
  });

  it('should handle UPDATE_URL_VARIABLE', () => {
    const initialState = Immutable.fromJS({
      isFetching: false,
      urlVariables,
    });

    const updatedUrlVariable = {
      name: 'key',
      value: 'notKey',
    };

    expect(
      reducer(initialState, {
        type: types.UPDATE_URL_VARIABLE,
        index: 0,
        value: updatedUrlVariable,
      }).toJSON(),
    ).toEqual({
      isFetching: false,
      urlVariables: [
        updatedUrlVariable,
        urlVariables[1],
      ],
    });
  });

  it('should handle DELETE_URL_VARIABLE', () => {
    const initialState = Immutable.fromJS({
      isFetching: false,
      urlVariables,
    });

    expect(
      reducer(initialState, {
        type: types.DELETE_URL_VARIABLE,
        index: 1,
      }).toJSON(),
    ).toEqual({
      isFetching: false,
      urlVariables: [
        urlVariables[0],
      ],
    });
  });
});


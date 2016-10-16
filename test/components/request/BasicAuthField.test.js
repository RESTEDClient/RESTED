import React from 'react';
import renderer from 'react-test-renderer';
import { combineReducers, createStore } from 'redux';
import { Provider, connect } from 'react-redux';

/* eslint-disable import/no-unresolved */
import { BasicAuthField } from 'components/Request/BasicAuthField';
import collapsable from 'store/collapsable/reducer';

const makeStore = (initial = {}) => createStore(
  combineReducers({ collapsable }),
  { collapsable: initial }
);

describe('BasicAuthField', () => {
  const store = makeStore({
    collapsable: {},
  });

  it('should match the previous snapshot when valid', () => {
    // Mock props
    BasicAuthField.defaultProps = {
      input: {},
      meta: {
        invalid: false,
        valid: true,
      },
    };

    const Decorated = connect()(BasicAuthField);

    const tree = renderer.create(
      <Provider store={store}>
        <Decorated />
      </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should match the previous snapshot when invalid', () => {
    // Mock props
    BasicAuthField.defaultProps = {
      input: {},
      meta: {
        invalid: true,
        valid: false,
      },
    };

    const Decorated = connect()(BasicAuthField);

    const tree = renderer.create(
      <Provider store={store}>
        <Decorated />
      </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});


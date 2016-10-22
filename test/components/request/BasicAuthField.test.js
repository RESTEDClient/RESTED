import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
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

  it('should match the previous snapshot', () => {
    const input = {};

    // Mock props
    BasicAuthField.defaultProps = {
      basicAuth: {
        username: {
          input,
        },
        password: {
          input,
        },
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

  it('should render the fields', () => {
    // Mock props
    BasicAuthField.defaultProps = {
      basicAuth: {
        username: {
          input: {
            value: 'someUsername',
            onChange() {},
          },
        },
        password: {
          input: {
            value: 'somePassword',
            onChange() {},
          },
        },
      },
    };

    const Decorated = connect()(BasicAuthField);

    const tree = mount(
      <Provider store={store}>
        <Decorated />
      </Provider>
    );

    const inputs = tree.find('input');

    expect(inputs.length).toBe(2);
    expect(inputs.first().prop('value')).toBe('someUsername');
    expect(inputs.last().prop('value')).toBe('somePassword');
  });
});


import React from 'react';
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import { reduxForm, reducer as form  } from 'redux-form';
import renderer from 'react-test-renderer';

/* eslint-disable import/no-unresolved */
import { Request } from 'components/Request';

jest.mock('react-dom');

const makeStore = (initial = {}) => createStore(
  combineReducers({ form }),
  { form: initial }
);

test('Request renders correctly', () => {
  const onSubmitFail = jest.fn();
  const store = makeStore({
    testForm: {}
  })

  const Decorated = reduxForm({
    form: 'testForm',
    onSubmitFail
  })(Request);

  const tree = renderer.create(
    <Provider store={store}>
      <Decorated />
    </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
  expect(onSubmitFail).not.toHaveBeenCalled();
});

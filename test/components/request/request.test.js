import React from 'react';
import { Provider } from 'react-redux';
import { reduxForm } from 'redux-form';
import renderer from 'react-test-renderer';

/* eslint-disable import/no-unresolved */
import { Request } from 'components/Request';

import makeStore from '../../makeStore';

it('should render correctly', () => {
  const onSubmitFail = jest.fn();
  const store = makeStore({
    form: {
      testForm: {
      },
    },
  });

  const Decorated = reduxForm({
    form: 'testForm',
    onSubmitFail,
  })(Request);

  const tree = renderer.create(
    <Provider store={store}>
      <Decorated sendRequest={() => {}} />
    </Provider>,
  ).toJSON();

  expect(tree).toMatchSnapshot();
  expect(onSubmitFail).not.toHaveBeenCalled();
});


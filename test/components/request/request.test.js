import React from 'react';
import { Provider } from 'react-redux';
import { reduxForm } from 'redux-form';
import renderer from 'react-test-renderer';

/* eslint-disable import/no-unresolved */
import { Request } from 'components/Request';

import makeStore from '../../makeStore';

it('should render correctly', () => {
  const props = {
    updateRequest() {},
    sendRequest() {},
    editMode: false,
    collectionsMinimized: false,
  };
  const onSubmitFail = jest.fn();
  const store = makeStore({
    form: {
      request: {
        values: {
          bodyType: 'json',
        },
      },
    },
  });

  const Decorated = reduxForm({
    form: 'request',
    onSubmitFail,
  })(Request);

  const tree = renderer.create(
    <Provider store={store}>
      <Decorated {...props} />
    </Provider>,
  );

  expect(tree).toMatchSnapshot();
  expect(onSubmitFail).not.toHaveBeenCalled();
});


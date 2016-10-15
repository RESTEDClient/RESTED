import React from 'react';
import renderer from 'react-test-renderer';

/* eslint-disable import/no-unresolved */
import Request from 'components/Request';

jest.mock('react-dom');

test('Request renders correctly', () => {
  const tree = renderer.create(
    <Request />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

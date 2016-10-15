import React from 'react';
import renderer from 'react-test-renderer';

/* eslint-disable import/no-unresolved */
import Collections from 'components/Collections';

jest.mock('react-dom');

test('Collections renders correctly', () => {
  const tree = renderer.create(
    <Collections />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

import React from 'react';
import renderer from 'react-test-renderer';

/* eslint-disable import/no-unresolved */
import Header from 'components/Header';

jest.mock('react-dom');

test('Header renders correctly', () => {
  const tree = renderer.create(
    <Header />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

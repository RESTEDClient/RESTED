import React from 'react';
import renderer from 'react-test-renderer';

test('Request renders correctly', () => {
  const tree = renderer.create(
    <h1>Facebook</h1>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

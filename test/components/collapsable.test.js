import React from 'react';
import renderer from 'react-test-renderer';

/* eslint-disable import/no-unresolved */
import { Collapsable } from 'components/Collapsable';

jest.mock('react-dom');

test('Collapsable renders correctly', () => {
  const tree = renderer.create(
    <Collapsable
      id="test"
      title="Test"
    >
      <h3>test</h3>
    </Collapsable>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

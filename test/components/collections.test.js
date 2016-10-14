import React from 'react';
import renderer from 'react-test-renderer';

import Collections from 'components/Collections';

test('Collections renders correctly', () => {
  const tree = renderer.create(
    <Collections />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

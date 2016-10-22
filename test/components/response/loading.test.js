import React from 'react';
import renderer from 'react-test-renderer';

/* eslint-disable import/no-unresolved */
import Loading from 'components/Response/Loading';

describe('Loading', () => {
  it('matches the previous snapshot', () => {
    const tree = renderer.create(
      <Loading icon="cog" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});


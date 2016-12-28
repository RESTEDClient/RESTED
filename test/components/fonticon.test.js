import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

/* eslint-disable import/no-unresolved */
import Fonticon from 'components/Fonticon';

describe('Fonticon', () => {
  it('matches the previous snapshot', () => {
    const tree = renderer.create(
      <Fonticon icon="cog" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a font-awesome icon', () => {
    const tree = mount(
      <Fonticon icon="cog" />,
    );
    expect(tree.find('i').prop('className')).toBe('fa fa-cog');
  });

  it('has the role "presentation" for a11y', () => {
    const tree = mount(
      <Fonticon icon="cog" />,
    );
    expect(tree.find('i').prop('role')).toBe('presentation');
  });

  it('passes through className', () => {
    const tree = mount(
      <Fonticon icon="cog" className="test" />,
    );
    expect(tree.find('i').prop('className')).toBe('fa fa-cog test');
  });
});


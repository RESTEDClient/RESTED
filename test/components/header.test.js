import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

/* eslint-disable import/no-unresolved */
import Header from 'components/Header';

jest.mock('react-dom');

test('Header renders correctly', () => {
  const tree = renderer.create(
    <Header />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Header contains the RESTED logo', () => {
  const tree = mount(
    <Header />,
  );
  expect(tree.find('img').prop('src')).toBe('img/rested-logo.png');
});

test('Header contains the RESTED name', () => {
  const tree = mount(
    <Header />,
  );
  expect(tree.find('h1 span').prop('children')).toBe('RESTED');
});


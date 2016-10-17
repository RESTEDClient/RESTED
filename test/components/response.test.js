import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

/* eslint-disable import/no-unresolved */
import { Response } from 'components/Response';

jest.mock('react-highlight');

describe('response component', () => {

  it('renders nothing given no props', () => {
    const tree = renderer.create(
      <Response />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders a result when given one', () => {
    const response = {
      url: 'http://www.phdcomics.com/comics/arc…',
      method: 'GET',
      body: 'Some long body'
    };

    const tree = renderer.create(
      <Response response={response}/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('displays the URL and method in the titlebar', () => {
    const response = {
      url: 'http://example.com',
      method: 'GET',
      body: 'Some long body'
    };

    const tree = mount(
      <Response response={response}/>
    );

    const expectedLink = (
      <a href="http://example.com">
        http://example.com
      </a>
    );

    const heading = tree.find('.panel-heading');
    expect(heading.contains(expectedLink)).toEqual(true);
  });
});

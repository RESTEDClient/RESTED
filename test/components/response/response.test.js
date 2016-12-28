import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

/* eslint-disable import/no-unresolved */
import { Response } from 'components/Response';
import makeStore from '../../makeStore';

jest.mock('react-highlight');

describe('response component', () => {
  const response = {
    url: 'http://example.com',
    method: 'GET',
    status: 200,
    statusText: 'OK',
    body: 'Some long body',
    headers: [{
      name: 'Content-Type',
      value: 'application/awesome',
    }],
  };

  const store = makeStore({
    request: { response },
  });

  it('renders nothing given no props', () => {
    const tree = renderer.create(
      <Response loading={false} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders a loading gif when requets is in flight', () => {
    const tree = mount(
      <Provider store={store}>
        <Response response={response} loading />
      </Provider>,
    );

    expect(!tree.find('Loading').isEmpty()).toBe(true);
  });

  it('renders a result when given one', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <Response response={response} loading={false} />
      </Provider>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('displays the status and statusText', () => {
    const tree = mount(
      <Provider store={store}>
        <Response response={response} loading={false} />
      </Provider>,
    );

    const h3 = tree.find('.panel-body h3');
    expect(h3.prop('children')[0]).toEqual(200);

    const small = h3.find('small');
    expect(small.prop('children')).toEqual('OK');
  });

  it('displays the URL and method in the titlebar', () => {
    const tree = mount(
      <Provider store={store}>
        <Response response={response} loading={false} />
      </Provider>,
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


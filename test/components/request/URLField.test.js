import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

/* eslint-disable import/no-unresolved */
import URLField from 'components/Request/URLField';

describe('URLField', () => {
  let initialProps;

  beforeEach(() => {
    initialProps = {
      placeholderUrl: 'https://example.com',
      input: {},
      meta: {
        valid: true,
        invalid: false,
      },
    };
  });

  it('should match the previous snapshot', () => {
    const tree = renderer.create(
      <URLField {...initialProps} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should match the previous snapshot with invalid field state', () => {
    initialProps.meta.valid = false;
    initialProps.meta.invalid = true;

    const tree = renderer.create(
      <URLField {...initialProps} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders an error when the field is invalid', () => {
    initialProps.meta.valid = false;
    initialProps.meta.touched = true;
    initialProps.meta.invalid = true;

    const tree = mount(
      <URLField {...initialProps} />
    );

    expect(tree.find('.form-group').hasClass('has-error')).toBe(true);
  });

  it('should render a placeholder into the field', () => {
    const tree = mount(
      <URLField {...initialProps} />
    );

    expect(tree.find('input').prop('placeholder')).toBe('https://example.com');
  });
});


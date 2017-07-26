import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { MethodField } from 'components/Request/MethodField';
import { REQUEST_METHODS } from 'constants/constants';

describe('MethodField', () => {
  let initialProps;

  beforeEach(() => {
    initialProps = {
      input: {},
      meta: {
        valid: true,
        invalid: false,
      },
    };
  });

  it('should match the previous snapshot', () => {
    const tree = renderer.create(
      <MethodField {...initialProps} />,
    );

    expect(tree).toMatchSnapshot();
  });

  it('should match the previous snapshot with invalid field state', () => {
    initialProps.meta.valid = false;
    initialProps.meta.invalid = true;

    const tree = renderer.create(
      <MethodField {...initialProps} />,
    );

    expect(tree).toMatchSnapshot();
  });

  it('renders an error when the field is invalid', () => {
    initialProps.meta.valid = false;
    initialProps.meta.invalid = true;

    const tree = mount(
      <MethodField {...initialProps} />,
    );

    expect(tree.find('.form-group').hasClass('has-error')).toBe(true);
  });

  it('should render all the methods of the REQUEST_METHODS constant', () => {
    const tree = mount(
      <MethodField {...initialProps} />,
    );

    const options = tree.find('option');
    const amountOfOptions = options.reduce(prev => prev + 1, 0);

    expect(amountOfOptions).toBe(8);

    // Assert all options are part of the REQUEST_METHODS set
    options.forEach(option => {
      const optionVal = option.prop('value');
      expect(REQUEST_METHODS.some(m => m === optionVal)).toBe(true);
    });

    // Assert all REQUEST_METHODS are part of the rendered output
    REQUEST_METHODS.forEach(m => {
      expect(options.someWhere(option => {
        const optionVal = option.prop('value');
        return m === optionVal;
      })).toBe(true);
    });
  });
});


import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { Provider, connect } from 'react-redux';
import { reduxForm } from 'redux-form';

/* eslint-disable import/no-unresolved */
import { BodyField } from 'components/Request/BodyField';
import makeStore from '../../makeStore';

describe('BodyField', () => {
  const store = makeStore({});

  it('should match the previous snapshot when !useFormData', () => {
    const Decorated = reduxForm({
      form: 'testForm',
    })(() => (
      <BodyField
        useFormData={false}
        setUseFormData={() => {}}
      />
    ));

    const tree = renderer.create(
      <Provider store={store}>
        <Decorated />
      </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should match the previous snapshot when !!useFormData', () => {
    const Decorated = reduxForm({
      form: 'testForm',
    })(() => (
      <BodyField
        useFormData
        setUseFormData={() => {}}
      />
    ));

    const tree = renderer.create(
      <Provider store={store}>
        <Decorated />
      </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render the formData fields', () => {
    const initialValues = {
      formData: [
        {
          name: 'foo',
          value: 'something',
        }, {
          name: 'bar',
          value: 'something2',
        },
      ],
    };

    let Decorated = reduxForm({
      form: 'testForm',
    })(() => (
      <BodyField
        useFormData
        setUseFormData={() => {}}
      />
    ));

    Decorated = connect(() => ({
      initialValues,
    }))(Decorated);

    const tree = mount(
      <Provider store={store}>
        <Decorated />
      </Provider>
    );

    // Filter out the initial checkbox
    const inputs = tree
      .find('input')
      .filterWhere(i => i.prop('type') !== 'checkbox');

    expect(inputs.length).toBe(4);

    let i = 0;
    initialValues.formData.forEach(header => {
      const nameField = inputs.at(i++); // eslint-disable-line no-plusplus
      const valField = inputs.at(i++);  // eslint-disable-line no-plusplus

      expect(nameField.prop('placeholder')).toBe('Name');
      expect(valField.prop('placeholder')).toBe('Value');
      expect(nameField.prop('value')).toBe(header.name);
      expect(valField.prop('value')).toBe(header.value);
    });
  });

  it('should render the data textarea', () => {
    const initialValues = {
      data: 'foo crux bluxorb',
    };

    let Decorated = reduxForm({
      form: 'testForm',
    })(() => (
      <BodyField
        useFormData={false}
        setUseFormData={() => {}}
      />
    ));

    Decorated = connect(() => ({
      initialValues,
    }))(Decorated);

    const tree = mount(
      <Provider store={store}>
        <Decorated />
      </Provider>
    );

    const input = tree.find('textarea');

    expect(input.length).toBe(1);
  });

  it('should call setUseFormData when !!useFormData checkbox is clicked', () => {
    const setUseFormData = jest.fn();

    const Decorated = reduxForm({
      form: 'testForm',
    })(() => (
      <BodyField
        useFormData
        setUseFormData={setUseFormData}
      />
    ));

    const tree = mount(
      <Provider store={store}>
        <Decorated />
      </Provider>
    );

    expect(setUseFormData).not.toHaveBeenCalled();

    const checkbox = tree.find('input').first();
    checkbox.simulate('change');

    expect(setUseFormData).toHaveBeenCalledWith(false);
  });

  it('should call setUseFormData when !useFormData checkbox is clicked', () => {
    const setUseFormData = jest.fn();

    const Decorated = reduxForm({
      form: 'testForm',
    })(() => (
      <BodyField
        useFormData={false}
        setUseFormData={setUseFormData}
      />
    ));

    const tree = mount(
      <Provider store={store}>
        <Decorated />
      </Provider>
    );

    expect(setUseFormData).not.toHaveBeenCalled();

    const checkbox = tree.find('input').first();
    checkbox.simulate('change');

    expect(setUseFormData).toHaveBeenCalledWith(true);
  });
});


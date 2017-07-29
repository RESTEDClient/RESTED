import React from 'react';
import renderer from 'react-test-renderer';
import { combineReducers, createStore } from 'redux';
import { FieldArray, reduxForm, reducer as form } from 'redux-form';
import { Provider, connect } from 'react-redux';
import { mount } from 'enzyme';

/* eslint-disable import/no-unresolved */
import HeadersField from 'components/Request/HeadersField';
import config from 'store/config/reducer';

const makeStore = (initial = {}) => createStore(
  combineReducers({ config, form }),
  { config: initial },
);

describe('HeadersField', () => {
  let store;
  let props;
  const headers = [
    {
      name: 'Content-Type',
      value: 'application/awesome',
    }, {
      name: 'DNT',
      value: '1',
    }, {
      name: 'Accept',
      value: 'text/html',
    },
  ];

  beforeEach(() => {
    props = {
      fields: {
        map: headers.map.bind(headers),
        remove: jest.fn(),
        push: jest.fn(),
      },
      meta: {
        invalid: false,
        valid: true,
      },
    };

    store = makeStore({
      config: {},
      testForm: {},
    });
  });

  it('should match the previous snapshot', () => {
    // Mock props
    HeadersField.defaultProps = props;

    const Decorated = reduxForm({
      form: 'testForm',
    })(HeadersField);

    const tree = renderer.create(
      <Provider store={store}>
        <Decorated />
      </Provider>,
    );

    expect(tree).toMatchSnapshot();
  });

  it('should render the fields with correct types', () => {
    let Decorated = reduxForm({
      form: 'testForm',
    })(() => (
      <FieldArray
        name="headers"
        component={HeadersField}
      />
    ));

    Decorated = connect(() => ({
      initialValues: {
        headers,
      },
    }))(Decorated);

    const tree = mount(
      <Provider store={store}>
        <Decorated />
      </Provider>,
    );

    const inputs = tree.find('input');
    expect(inputs.length).toBe(6);

    let i = 0;
    headers.forEach(header => {
      const nameField = inputs.at(i++); // eslint-disable-line no-plusplus
      const valField = inputs.at(i++);  // eslint-disable-line no-plusplus

      expect(nameField.prop('placeholder')).toBe('Name');
      expect(valField.prop('placeholder')).toBe('Value');
      expect(nameField.prop('value')).toBe(header.name);
      expect(valField.prop('value')).toBe(header.value);
    });
  });

  it('should call fields.push when "Add header" is pressed', () => {
    const Decorated = reduxForm({
      form: 'testForm',
    })(() => <HeadersField {...props} />);

    const tree = mount(
      <Provider store={store}>
        <Decorated />
      </Provider>,
    );

    expect(props.fields.push).not.toHaveBeenCalled();

    tree.find('#addHeaderButton').simulate('click');
    expect(props.fields.push).toHaveBeenCalledWith({});
  });

  it('should call fields.remove when "Remove header" is pressed', () => {
    const Decorated = reduxForm({
      form: 'testForm',
    })(() => <HeadersField {...props} />);

    const tree = mount(
      <Provider store={store}>
        <Decorated />
      </Provider>,
    );

    expect(props.fields.remove).not.toHaveBeenCalled();

    tree.find('#removeHeaderButton0').simulate('click');
    expect(props.fields.remove).toHaveBeenCalledWith(0);
  });
});


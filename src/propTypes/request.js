import ImmutablePropTypes from 'react-immutable-proptypes';
import { PropTypes } from 'react';
import { REQUEST_METHODS } from 'constants/constants';

const { string, oneOf, shape, arrayOf, bool } = PropTypes;

export const requestShape = {
  id: string.isRequired,
  url: string.isRequired,
  method: oneOf(REQUEST_METHODS).isRequired,
  data: string,
  useFormData: bool,
  formData: arrayOf(
    shape({
      name: string.isRequired,
      value: string.isRequired,
    }),
  ),
  headers: arrayOf(
    shape({
      name: string.isRequired,
      value: string.isRequired,
    }).isRequired,
  ).isRequired,
};

export const immutableRequestShape = ImmutablePropTypes.contains({
  ...requestShape,
  formData: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      name: string.isRequired,
      value: string.isRequired,
    }),
  ),
  headers: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      name: string.isRequired,
      value: string.isRequired,
    }).isRequired,
  ).isRequired,
});

export default shape(requestShape);


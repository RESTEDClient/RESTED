import { PropTypes } from 'react';
import { REQUEST_METHODS } from '../constants/constants';

const { string, oneOf, shape, arrayOf, bool } = PropTypes;

export const requestShape = {
  id: string.isRequired,
  url: string.isRequired,
  method: oneOf(REQUEST_METHODS).isRequired,
  data: string.isRequired,
  useFormData: bool.isRequired,
  formData: arrayOf(
    shape({
      name: string.isRequired,
      value: string.isRequired,
    })
  ).isRequired,
  headers: arrayOf(
    shape({
      name: string.isRequired,
      value: string.isRequired,
    }).isRequired
  ).isRequired,
};

export default shape(requestShape);


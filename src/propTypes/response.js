import { PropTypes } from 'react';
import { REQUEST_METHODS } from 'constants/constants';

const { string, oneOf, shape, arrayOf, number } = PropTypes;

export const responseShape = {
  url: string.isRequired,
  body: string.isRequired,
  status: number.isRequired,
  statusText: string.isRequired,
  totalTime: number.isRequired,
  method: oneOf(REQUEST_METHODS).isRequired,
  headers: arrayOf(
    shape({
      name: string.isRequired,
      value: string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default shape(responseShape);


import { PropTypes } from 'react';
import requestPropType from './request';

const { string, shape, arrayOf, bool } = PropTypes;

export const collectionShape = {
  name: string.isRequired,
  id: string.isRequired,
  minimized: bool,
  requests: arrayOf(requestPropType).isRequired,
};

export default shape(collectionShape);


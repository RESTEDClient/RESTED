import ImmutablePropTypes from 'react-immutable-proptypes';
import { PropTypes } from 'react';
import requestPropType, { immutableRequestShape } from './request';

const { string, shape, arrayOf, bool } = PropTypes;

export const collectionShape = {
  name: string,
  id: string.isRequired,
  minimized: bool,
  requests: arrayOf(requestPropType).isRequired,
};

export const immutableCollectionShape = ImmutablePropTypes.contains({
  ...collectionShape,
  requests: ImmutablePropTypes.listOf(
    immutableRequestShape,
  ).isRequired,
});

export default shape(collectionShape);


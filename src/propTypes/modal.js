import { PropTypes } from 'react';

const { string, node, bool, shape, arrayOf, func } = PropTypes;

export const modalShape = {
  title: string.isRequired,
  body: node.isRequired,
  errorData: string,
  visible: bool.isRequired,
  cancelClick: func,
  actions: arrayOf(shape({
    text: string.isRequired,
    type: string,
    icon: string,
    click: func.isRequired,
  })),
};

export default shape(modalShape);


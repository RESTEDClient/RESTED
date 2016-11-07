import { PropTypes } from 'react';

const { string, bool, shape, arrayOf, func } = PropTypes;

export const modalShape = {
  title: string.isRequired,
  body: string.isRequired,
  errorData: string,
  visible: bool.isRequired,
  cancelClick: func,
  actions: arrayOf(shape({
    text: string.isRequired,
    click: func.isRequired,
  })),
};

export default shape(modalShape);


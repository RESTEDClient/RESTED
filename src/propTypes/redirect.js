import { PropTypes } from 'react';
import { REQUEST_METHODS } from 'constants/constants';

const { string, oneOf, shape, arrayOf, number, bool } = PropTypes;

export const redirectShape = {
  documentUrl: string.isRequired,
  frameId: number.isRequired,
  fromCache: bool.isRequired,
  ip: string.isRequired,
  method: oneOf(REQUEST_METHODS).isRequired,
  originUrl: string.isRequired,
  parentFrameId: number.isRequired,
  redirectUrl: string.isRequired,
  requestId: string.isRequired,
  responseHeaders: arrayOf(
    shape({
      name: string.isRequired,
      value: string.isRequired,
    }).isRequired,
  ).isRequired,
  statusCode: number.isRequired,
  statusLine: string.isRequired,
  tabId: number.isRequired,
  time: number.isRequired,
  timeStamp: number.isRequired,
  type: string.isRequired,
  url: string.isRequired,
};

export default shape(redirectShape);


import { PropTypes } from 'react';
import { REQUEST_METHODS } from 'constants/constants';

const { string, oneOf, shape, arrayOf, number, bool } = PropTypes;

export const redirectShape = {
  documentUrl: string.isRequired,
  frameId: number.isRequired,
  fromCache: bool.isRequired,
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
  tabId: number.isRequired,
  time: number.isRequired,
  timeStamp: number.isRequired,
  type: string.isRequired,
  url: string.isRequired,
  // Not present on HSTS upgrade requests in Firefox
  ip: string,
  statusCode: number,
  statusLine: string,
};

export default shape(redirectShape);


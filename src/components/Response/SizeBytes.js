import React, { PropTypes } from 'react';

import byteFormatter from 'utils/byteFormatter';

function SizeBytes({ size }) {
  return (
    <span title={`${size} bytes`}>
      {byteFormatter(size)}
    </span>
  );
}

SizeBytes.propTypes = {
  size: PropTypes.number.isRequired,
};

export default SizeBytes;

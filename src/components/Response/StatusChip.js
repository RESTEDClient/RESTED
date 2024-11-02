import React, { PropTypes } from 'react';

import { Label } from 'react-bootstrap';

function StatusChip({ statusCode }) {
  let labelStyle = 'default'
  if (statusCode >= 200 && statusCode < 300) labelStyle = 'success'
  else if (statusCode >= 400 && statusCode < 600) labelStyle = 'danger'

  return (
    <Label bsStyle={labelStyle}>{statusCode}</Label>
  );
}

StatusChip.propTypes = {
  statusCode: PropTypes.number.isRequired,
};

export default StatusChip;


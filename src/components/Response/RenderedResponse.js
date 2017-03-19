import React, { PropTypes } from 'react';
import renderHTML from 'react-render-html';

import Collapse from 'components/Collapsable';

function RenderedResponse({ html }) {
  return (
    <Collapse
      title="Preview"
      id="Preview"
    >
      {renderHTML(html)}
    </Collapse>
  );
}

RenderedResponse.propTypes = {
  html: PropTypes.string.isRequired,
};

export default RenderedResponse;


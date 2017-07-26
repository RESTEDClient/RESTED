import React, { PropTypes } from 'react';
import Highlight from 'react-highlight';

import Collapse from 'components/Collapsable';
import { responseShape } from 'propTypes/response';

function Headers({ headers, expanded }) {
  if (expanded) {
    return (
      <div>
        <h4>Headers</h4>
        <Highlight className="http">
          {headers.reduce((prev, header) => (
            `${prev ? `${prev}\n` : ''}${header.name}: ${header.value}`
          ), '')}
        </Highlight>
      </div>
    );
  }

  return (
    <Collapse
      title="Headers"
      id="Headers"
    >
      <Highlight className="http">
        {headers.reduce((prev, header) => (
          `${prev ? `${prev}\n` : ''}${header.name}: ${header.value}`
        ), '')}
      </Highlight>
    </Collapse>
  );
}

Headers.defaultProps = {
  expanded: false,
};

Headers.propTypes = {
  headers: responseShape.headers,
  expanded: PropTypes.bool,
};

export default Headers;


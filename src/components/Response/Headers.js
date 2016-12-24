import React from 'react';
import Highlight from 'react-highlight';

import Collapse from 'components/Collapsable';
import { responseShape } from 'propTypes/response';

function Headers({ headers }) {
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

Headers.propTypes = {
  headers: responseShape.headers,
};

export default Headers;


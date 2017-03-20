import React, { PropTypes } from 'react';

import Collapse from 'components/Collapsable';
import base64 from 'utils/base64';
import { PreviewContainer } from './StyledComponents';

/**
 * Preview the content of the request by rendering it
 * in an iframe.
 *
 * Uses the sandbox attribute to place restrictions on the
 * markup in the frame among other thins preventing
 * scripts from running. This should be suficcient as
 * we have control of the content outside of the iframe.
 */
function RenderedResponse({ html }) {
  return (
    <Collapse
      title="Preview"
      id="Preview"
      mountOnEnter
      unmountOnExit
    >
      <PreviewContainer>
        <iframe
          src={`data:text/html;base64,${base64(html)}`}
          sandbox=""
          referrerPolicy="no-referrer"
        />
      </PreviewContainer>
    </Collapse>
  );
}

RenderedResponse.propTypes = {
  html: PropTypes.string.isRequired,
};

export default RenderedResponse;


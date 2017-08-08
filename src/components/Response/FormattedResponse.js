import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import Highlight from 'react-highlight';
import { Inspector, TableInspector } from 'react-inspector';
import formatXml from 'xml-formatter';

import { isDisabledHighlighting, getExpandDepth, getResponseRenderer } from 'store/options/selectors';
import approximateSizeFromLength from 'utils/approximateSizeFromLength';

const domParser = new DOMParser();

/* eslint-disable react/prop-types */
const renderInspector = props => {
  const {
    response,
    responseRenderer,
    expandDepth,
    contentType,
    type,
  } = props;

  let body;
  try {
    if (type.json) {
      body = JSON.parse(response.body);
    } else if (type.xml) {
      body = domParser.parseFromString(response.body, 'application/xml');
    } else if (type.html) {
      body = domParser.parseFromString(response.body, 'text/html');
    }
  } catch (e) {
    // Server lied about content
    // eslint-disable-next-line no-console
    console.warn('Encountered an error while formatting response as ' +
      `${contentType && contentType.value}. Falling back to plain text`, e);
  }


  return responseRenderer === 'tree'
    ? <Inspector data={body} expandLevel={expandDepth} />
    : <TableInspector data={body} expandLevel={expandDepth} />;
};

const renderSyntaxHighlightedResponse = props => {
  const {
    response,
    highlightingDisabled,
    interceptedResponse,
    contentType,
    type,
  } = props;

  const contentLength = interceptedResponse.responseHeaders.find(header => (
    header.name.toLowerCase() === 'content-length'
  ));
  const contentSize = contentLength
    ? Number(contentLength.value)
    : approximateSizeFromLength(response.body);

  let body = response.body;
  try {
    if (type.json) {
      body = JSON.stringify(JSON.parse(body), null, 2);
    } else if (type.xml) {
      body = formatXml(body);
    }
  } catch (e) {
    // Server lied about content
    // eslint-disable-next-line no-console
    console.warn('Encountered an error while formatting response as ' +
      `${contentType && contentType.value}. Falling back to plain text`, e);
  }

  return (
    !highlightingDisabled && contentSize < 20000
      ? (
        <Highlight>
          {body}
        </Highlight>
      ) : (
        <span>
          {contentSize >= 20000 && (
            <Alert bsStyle="warning">
              The size of the response is greater than 20KB, syntax
              highlighting has been disabled for performance reasons.
            </Alert>
          )}

          <code><pre>
            {body}
          </pre></code>
        </span>
      )
  );
};
/* eslint-enable react/prop-types */

export const FormattedResponse = props => {
  const { contentType, type } = props;

  switch (props.responseRenderer) {
    case 'tree':
    case 'table':
      if (type.html || type.xml || type.json) {
        return renderInspector({ contentType, type, ...props });
      }
      // Intentional fall-through
      // eslint-disable-next-line no-fallthrough
    case 'classic':
      return renderSyntaxHighlightedResponse({ contentType, type, ...props });
    default:
      throw new Error(
        `Formatting with renderer ${props.responseRenderer} is not supported`,
      );
  }
};

const mapStateToProps = state => ({
  responseRenderer: getResponseRenderer(state),
  expandDepth: getExpandDepth(state),
  highlightingDisabled: isDisabledHighlighting(state),
});

export default connect(mapStateToProps)(FormattedResponse);

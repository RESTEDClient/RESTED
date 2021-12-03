import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import Highlight from 'react-highlight';
import formatXml from 'xml-formatter';

import * as Actions from 'store/request/actions';
import { isDisabledHighlighting, getSyntaxHighlightingMaxSize, isWrapResponse } from 'store/options/selectors';
import responsePropTypes, { responseShape } from 'propTypes/response';
import getContentType from 'utils/contentType';
import approximateSizeFromLength from 'utils/approximateSizeFromLength';

import { StyledResponse, StyledHeader, Status } from './StyledComponents';
import Headers from './Headers';
import RenderedResponse from './RenderedResponse';

function Titlebar({ url, time }) {
  return (
    <StyledHeader>
      <h3>
        Response ({time}) - <a href={url} className="text-muted">{url}</a>
      </h3>
    </StyledHeader>
  );
}

Titlebar.propTypes = {
  url: responseShape.url,
  time: PropTypes.node.isRequired,
};

export function Response(props) {
  const {
    response,
    highlightingDisabled,
    syntaxHighlightingMaxSize,
    wrapResponse,
    redirectChain,
    interceptedResponse,
  } = props;

  if (!response || !interceptedResponse) return null;

  const { method, url, totalTime } = response;
  let { body } = response;

  let time;
  if (redirectChain.length > 0) {
    time = `${(interceptedResponse.time / 1000).toFixed(3)}s, total time ${totalTime / 1000}s`;
  } else {
    time = `${totalTime / 1000}s`;
  }

  const contentLength = interceptedResponse.responseHeaders.find(header => (
    header.name.toLowerCase() === 'content-length'
  ));
  const contentType = interceptedResponse.responseHeaders.find(header => (
    header.name.toLowerCase() === 'content-type'
  ));

  const contentSize = contentLength
    ? Number(contentLength.value)
    : approximateSizeFromLength(body);
  const type = getContentType(contentType && contentType.value);

  try {
    if (type.json) {
      body = JSON.stringify(JSON.parse(body), null, 2);
    } else if (type.xml) {
      body = formatXml(body);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Encountered an error while formatting response as ' +
      `${contentType && contentType.value}. Falling back to plain text`, e);
  }

  return (
    <StyledResponse
      wrapResponse={wrapResponse}
      header={<Titlebar method={method} url={url} time={time} />}
    >
      <h3>
        <Status
          green={response.status >= 200 && response.status < 300}
          red={response.status >= 400 && response.status < 600}
        >
          {response.status}
        </Status>
        <small> {response.statusText}</small>
      </h3>

      <Headers headers={interceptedResponse.responseHeaders} />
      {type.html && <RenderedResponse html={body} />}

      {!highlightingDisabled && contentSize < (syntaxHighlightingMaxSize * 1000)
        ? (
          <Highlight>
            {body}
          </Highlight>
        ) : (
          <span>
            {contentSize >= (syntaxHighlightingMaxSize * 1000) && (
              <Alert bsStyle="warning">
                The response size exceeds {syntaxHighlightingMaxSize} KB. Syntax highlighting
                has been disabled for performance reasons. This value is configurable in the
                options menu.
              </Alert>
            )}

            <code><pre>
              {body}
            </pre></code>
          </span>
        )
      }
    </StyledResponse>
  );
}

Response.propTypes = {
  response: responsePropTypes,
  highlightingDisabled: PropTypes.bool.isRequired,
  syntaxHighlightingMaxSize: PropTypes.number.isRequired,
  wrapResponse: PropTypes.bool.isRequired,
  redirectChain: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  interceptedResponse: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  highlightingDisabled: isDisabledHighlighting(state),
  syntaxHighlightingMaxSize: getSyntaxHighlightingMaxSize(state),
  wrapResponse: isWrapResponse(state),
});

export default connect(mapStateToProps, Actions)(Response);


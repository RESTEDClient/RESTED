import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Panel, Alert } from 'react-bootstrap';
import Highlight from 'react-highlight';
import formatXml from 'xml-formatter';

import * as Actions from 'store/request/actions';
import { getResponse, getLoading } from 'store/request/selectors';
import { isDisabledHighlighting, isWrapResponse } from 'store/options/selectors';
import responsePropTypes, { responseShape } from 'propTypes/response';
import getContentType from 'utils/contentType';
import approximateSizeFromLength from 'utils/approximateSizeFromLength';

import { StyledResponse, StyledHeader, Status } from './StyledComponents';
import Loading from './Loading';
import Headers from './Headers';
import RenderedResponse from './RenderedResponse';

function Titlebar({ url, time }) {
  return (
    <StyledHeader>
      <h3>
        Response ({time / 1000}s) - <a href={url} className="text-muted">{url}</a>
      </h3>
    </StyledHeader>
  );
}

Titlebar.propTypes = {
  url: responseShape.url,
  time: responseShape.time,
};

export function Response(props) {
  const {
    response,
    loading,
    highlightingDisabled,
    wrapResponse,
  } = props;

  if (loading) {
    return (
      <Panel>
        <Loading />
      </Panel>
    );
  }

  if (!response) return null;

  const { method, url, headers, time } = response;
  let { body } = response;

  const contentLength = headers.find(header => (
    header.name.toLowerCase() === 'content-length'
  ));
  const contentType = headers.find(header => (
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

      <Headers headers={headers} />
      {type.html && <RenderedResponse html={body} />}

      {!highlightingDisabled && contentSize < 20000
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
      }
    </StyledResponse>
  );
}

Response.propTypes = {
  loading: PropTypes.bool.isRequired,
  response: responsePropTypes,
  highlightingDisabled: PropTypes.bool.isRequired,
  wrapResponse: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  response: getResponse(state),
  loading: getLoading(state),
  highlightingDisabled: isDisabledHighlighting(state),
  wrapResponse: isWrapResponse(state),
});

export default connect(mapStateToProps, Actions)(Response);


import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as Actions from 'store/request/actions';
import { isWrapResponse } from 'store/options/selectors';
import responsePropTypes, { responseShape } from 'propTypes/response';
import getContentType from 'utils/contentType';

import { StyledResponse, StyledHeader, Status } from './StyledComponents';
import Headers from './Headers';
import RenderedResponse from './RenderedResponse';
import FormattedResponse from './FormattedResponse';

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
    wrapResponse,
    redirectChain,
    interceptedResponse,
  } = props;

  if (!response || !interceptedResponse) return null;

  const { method, url, totalTime, body } = response;

  const contentType = interceptedResponse.responseHeaders.find(header => (
    header.name.toLowerCase() === 'content-type'
  ));

  const type = getContentType(contentType && contentType.value);

  let time;
  if (redirectChain.length > 0) {
    time = `${(interceptedResponse.time / 1000).toFixed(3)}s, total time ${totalTime / 1000}s`;
  } else {
    time = `${totalTime / 1000}s`;
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
      <FormattedResponse contentType={contentType} type={type} {...props} />
    </StyledResponse>
  );
}

Response.propTypes = {
  response: responsePropTypes,
  wrapResponse: PropTypes.bool.isRequired,
  redirectChain: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  interceptedResponse: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  wrapResponse: isWrapResponse(state),
});

export default connect(mapStateToProps, Actions)(Response);


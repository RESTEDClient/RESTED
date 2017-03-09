import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Panel, Alert } from 'react-bootstrap';
import Highlight from 'react-highlight';

import * as Actions from 'store/request/actions';
import responsePropTypes, { responseShape } from 'propTypes/response';

import { StyledResponse, StyledHeader, Status } from './StyledComponents';
import Loading from './Loading';
import Headers from './Headers';

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

export function Response({ response, loading }) {
  if (loading) {
    return (
      <Panel>
        <Loading />
      </Panel>
    );
  }

  if (!response) return null;

  const { method, url, headers, body, time } = response;

  // Some responses don't include the Content-Length header, in those cases
  // we simply allow it to be highligthed, for better or worse
  const contentLength = headers.find(header => (
    header.name.toLowerCase() === 'content-length'
  ));

  return (
    <StyledResponse header={<Titlebar method={method} url={url} time={time} />}>
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
      {!contentLength || Number(contentLength.value) < 20000
        ? (
          <Highlight>
            {body}
          </Highlight>
        ) : (
          <span>
            <Alert bsStyle="warning">
              The size of the response is greater than 20KB, syntax
              highlighting has been disabled for performance reasons.
            </Alert>

            <code><pre>
              { body }
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
};

const mapStateToProps = ({ request: { loading, response } }) => ({
  response,
  loading,
});

export default connect(mapStateToProps, Actions)(Response);


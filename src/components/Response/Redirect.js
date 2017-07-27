import React, { PropTypes } from 'react';
import responsePropTypes, { redirectShape } from 'propTypes/redirect';

import { StyledResponse, StyledHeader, Status } from './StyledComponents';
import Headers from './Headers';

function Titlebar({ url, time, onClick }) {
  return (
    <StyledHeader expandable onClick={onClick}>
      <h3>
        Redirect ({(time / 1000).toFixed(3)}s) - <a href={url} className="text-muted">{url}</a>
      </h3>
    </StyledHeader>
  );
}

Titlebar.propTypes = {
  url: redirectShape.url,
  time: redirectShape.time,
  onClick: PropTypes.func.isRequired,
};

function Redirect(props) {
  const {
    response,
    headers,
    isExpanded,
    setExpanded,
  } = props;

  if (!response || !headers) return null;

  const { method, url, time } = response;

  return (
    <StyledResponse
      collapsible
      expanded={isExpanded}
      header={<Titlebar method={method} url={url} time={time} onClick={setExpanded} />}
    >
      <h3>
        <Status
          green={response.statusCode >= 200 && response.statusCode < 300}
          red={response.statusCode >= 400 && response.statusCode < 600}
        >
          {response.statusCode}
        </Status>
        <small> {response.statusLine.replace(/.*\d{3} /, '')}</small>
      </h3>

      <Headers expanded headers={headers} />
    </StyledResponse>
  );
}

Redirect.propTypes = {
  response: responsePropTypes,
  headers: redirectShape.responseHeaders,
  isExpanded: PropTypes.bool.isRequired,
  setExpanded: PropTypes.func.isRequired,
};

export default Redirect;


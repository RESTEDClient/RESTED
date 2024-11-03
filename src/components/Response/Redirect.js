import React, { PropTypes } from 'react';
import responsePropTypes, { redirectShape } from 'propTypes/redirect';

import { StyledResponse, StyledHeader } from './StyledComponents';
import Headers from './Headers';
import StatusChip from './StatusChip';

function Titlebar({ url, time, statusCode, onClick }) {
  return (
    <StyledHeader expandable onClick={onClick}>
      <h3>
        <StatusChip statusCode={statusCode} />
        Redirect ({(time / 1000).toFixed(3)}s)
        <a href={url} className="text-muted">{url}</a>
      </h3>
    </StyledHeader>
  );
}

Titlebar.propTypes = {
  url: redirectShape.url,
  time: redirectShape.time,
  statusCode: PropTypes.number.isRequired,
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

  const { method, url, time, statusCode } = response;

  return (
    <StyledResponse
      collapsible
      expanded={isExpanded}
      header={(
        <Titlebar
          method={method}
          statusCode={statusCode}
          url={url}
          time={time}
          onClick={setExpanded}
        />
      )}
    >
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


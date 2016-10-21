import React from 'react';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';
import Highlight from 'react-highlight';

import Headers from './Headers';
import * as Actions from '../../store/request/actions';
import responsePropTypes, { responseShape } from '../../propTypes/response';

function Titlebar({ method, url }) {
  return (
    <h3>
      {method} - <a href={url}>{url}</a>
    </h3>
  );
}

Titlebar.propTypes = {
  method: responseShape.method,
  url: responseShape.url,
};

export function Response({ response }) {
  if (!response) return null;

  const { method, url, headers, body } = response;
  return (
    <Panel header={<Titlebar method={method} url={url} />}>
      <strong>{response.status}</strong>
      <small>{response.statusText}</small>
      <Headers headers={headers} />
      <Highlight>
        {body}
      </Highlight>
    </Panel>
  );
}

Response.propTypes = {
  response: responsePropTypes,
};

const mapStateToProps = ({ request: { response } }) => ({
  response,
});

export default connect(mapStateToProps, Actions)(Response);


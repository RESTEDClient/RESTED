import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';
import Highlight from 'react-highlight';

import * as Actions from '../../store/request/actions';

function Titlebar({ method, url }) {
  return (
    <h3>
      {method} - <a href={url}>{url}</a>
    </h3>
  );
}

Titlebar.propTypes = {
  method: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

function Headers({ headers }) {
  return <span>headers</span>;
}

Headers.headers = {
  headers: PropTypes.array.isRequired,
};

export function Response({ response }) {
  if (!response) return null;

  const { method, url, headers, body } = response;
  return (
    <Panel header={<Titlebar method={method} url={url} />}>
      <Headers headers={headers} />
      <Highlight>
        {body}
      </Highlight>
    </Panel>
  );
}

Response.propTypes = {
  response: PropTypes.object,
};

const mapStateToProps = ({ request: { response } }) => ({
  response,
});

export default connect(mapStateToProps, Actions)(Response);


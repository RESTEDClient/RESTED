import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';
import Highlight from 'react-highlight';

import Loading from './Loading';
import Headers from './Headers';
import * as Actions from '../../store/request/actions';
import responsePropTypes, { responseShape } from '../../propTypes/response';

function Titlebar({ url }) {
  return (
    <h3>
      Response - <a href={url}>{url}</a>
    </h3>
  );
}

Titlebar.propTypes = {
  url: responseShape.url,
};

export function Response({ response, loading }) {
  console.log('response', response);
  if (loading) {
    return (
      <Panel>
        <Loading />
      </Panel>
    );
  }

  if (!response) return null;

  const { method, url, headers, body } = response;
  return (
    <Panel header={<Titlebar method={method} url={url} />}>
      <h3>
        {response.status}
        <small>{response.statusText}</small>
      </h3>
      <Headers headers={headers} />
      <Highlight>
        {body}
      </Highlight>
    </Panel>
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


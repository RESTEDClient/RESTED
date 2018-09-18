import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Panel, Alert, Accordion } from 'react-bootstrap';

import { getResponse, getInterceptedResponse, getRedirectChain, getLoading } from 'store/request/selectors';
import responsePropTypes from 'propTypes/response';

import Loading from './Loading';
import Redirect from './Redirect';
import Response from './Response';

export class ResponseAccordion extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Error),
    ]),
    response: responsePropTypes,
    redirectChain: PropTypes.arrayOf(PropTypes.shape({})),
    interceptedResponse: PropTypes.shape({}),
  };

  state = {
    expanded: 'response',
  };

  setActivePanel = activeKey => this.setState({ activeKey });

  toggleExpanded = index => {
    this.setState({ expanded: index === this.state.expanded ? null : index });
  };

  render() {
    const {
      response,
      error,
      loading,
      redirectChain,
      interceptedResponse,
    } = this.props;

    if (error) {
      return (
        <Alert bsStyle="danger">
          {`An error occurred while fetching the resource: ${error}`}
        </Alert>
      );
    }

    if (loading) {
      return (
        <Panel>
          <Loading />
        </Panel>
      );
    }

    if (!response) return null;

    return (
      <Accordion>
        {redirectChain.map((redirectResponse, i) => (
          <Redirect
            response={redirectResponse}
            headers={redirectResponse.responseHeaders}
            isExpanded={this.state.expanded === i}
            setExpanded={() => this.toggleExpanded(i)}
            key={i}
          />
        ))}
        <Response
          response={response}
          redirectChain={redirectChain}
          interceptedResponse={interceptedResponse}
        />
      </Accordion>
    );
  }
}

const mapStateToProps = state => ({
  response: getResponse(state),
  interceptedResponse: getInterceptedResponse(state),
  redirectChain: getRedirectChain(state),
  error: state.request.error,
  loading: getLoading(state),
});

export default connect(mapStateToProps)(ResponseAccordion);


import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import flow from 'lodash.flow';

import Header from 'components/Header';
import Collections from 'components/Collections';
import Request from 'components/Request';
import Response from 'components/Response';
import Modal from 'components/Modal';
import { fetchOptions } from 'store/options/actions';
import { fetchUrlVariables } from 'store/urlVariables/actions';

/*
 * This must be a React.Component because DragDropContext
 * attaches a ref to the component, which as we know will
 * not work with a stateless functional component.
 */
/* eslint-disable react/prefer-stateless-function */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchOptions();
    this.props.fetchUrlVariables();
  }

  render() {
    return (
      <div>
        <section>
          <Header />
        </section>
        <section>
          <main>
            <Row>
              <Col xsHidden sm={4}>
                <Collections />
              </Col>
              <Col xs={12} sm={8}>
                <Request />
                <Response />
              </Col>
            </Row>
          </main>
        </section>
        <Modal />
      </div>
    );
  }
}

App.propTypes = {
  fetchUrlVariables: PropTypes.func.isRequired,
  fetchOptions: PropTypes.func.isRequired,
};

export default flow(
  connect(null, { fetchOptions, fetchUrlVariables }),
  DragDropContext(HTML5Backend),
)(App);


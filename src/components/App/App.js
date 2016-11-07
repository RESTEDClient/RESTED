import React from 'react';
import { Row, Col } from 'react-bootstrap';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import Header from '../Header';
import Collections from '../Collections';
import Request from '../Request';
import Response from '../Response';
import Modal from '../Modal';

/*
 * This must be a React.Component because DragDropContext
 * attaches a ref to the component, which as we know will
 * not work with a stateless functional component.
 */
/* eslint-disable react/prefer-stateless-function */
class App extends React.Component {
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

export default DragDropContext(HTML5Backend)(App);


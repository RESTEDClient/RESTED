import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Header from '../Header';
import Collections from '../Collections';
import Request from '../Request';
import Response from '../Response';

export default function App() {
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
    </div>
  );
}


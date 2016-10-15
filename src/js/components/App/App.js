import React from 'react';
import { Row } from 'react-bootstrap';

import Header from '../Header';
import Collections from '../Collections';
import Request from '../Request';

export default function App() {
  return (
    <div>
      <section>
        <Header />
      </section>
      <section>
        <main>
          <Row>
            <Collections />
            <Request />
          </Row>
        </main>
      </section>
    </div>
  );
}


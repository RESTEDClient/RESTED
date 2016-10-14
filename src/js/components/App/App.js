import React from 'react';

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
          <Collections />
          <Request />
        </main>
      </section>
    </div>
  );
}


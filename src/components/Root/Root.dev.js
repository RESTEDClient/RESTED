import React from 'react';
import { Grid } from 'react-bootstrap';

import App from 'components/App';
import DevTools from 'components/DevTools';

export default function Root() {
  return (
    <Grid fluid>
      <App />
      <DevTools />
    </Grid>
  );
}


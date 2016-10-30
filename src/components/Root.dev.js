import React from 'react';
import { Grid } from 'react-bootstrap';

import App from './App';
import DevTools from '../devtools/DevTools';

export default function Root() {
  return (
    <Grid fluid>
      <App />
      <DevTools />
    </Grid>
  );
}


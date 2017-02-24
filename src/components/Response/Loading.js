import React from 'react';

import { LoadingSpinner } from './StyledComponents';

export default function Loading() {
  return (
    <LoadingSpinner
      icon="gear"
      className="fa-spin col-xs-12 text-center"
    />
  );
}


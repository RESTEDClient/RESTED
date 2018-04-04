import { injectGlobal } from 'styled-components';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  body {
    overflow-x: hidden;
  }

  .pseudo-hidden {
    position: absolute;
    left: -10000px;
  }
`;


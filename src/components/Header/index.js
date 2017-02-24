import React from 'react';
import { StyledHeader } from './StyledComponents';

export default function Header() {
  return (
    <StyledHeader>
      <h1>
        <img
          className="logo"
          role="presentation"
          height="40"
          src="img/rested-logo.png"
        />
        <span>RESTED</span>
      </h1>
    </StyledHeader>
  );
}


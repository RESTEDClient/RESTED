import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { isDarkTheme } from 'store/options/selectors';

import { StyledHeader } from './StyledComponents';

export function Header({ darkMode }) {
  return (
    <StyledHeader darkMode={darkMode}>
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

Header.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  darkMode: isDarkTheme(state),
});

export default connect(mapStateToProps)(Header);


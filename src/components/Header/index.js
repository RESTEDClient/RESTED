import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

import { isDarkTheme } from 'store/options/selectors';
import { showOptionsModal } from 'utils/modal';
import Fonticon from 'components/Fonticon';
import * as modalActions from 'store/modal/actions';

import { StyledHeader } from './StyledComponents';

export function Header({ darkMode, ...props }) {
  return (
    <StyledHeader darkMode={darkMode}>
      <Navbar fluid inverse={darkMode}>
        <Navbar.Header>
          <Navbar.Brand>
            <img
              className="logo"
              role="presentation"
                  height="30"
              src="img/rested-logo.png"
            />
            <h3>RESTED</h3>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavItem onClick={() => {
            showOptionsModal(props)
          }}>
            <Fonticon icon="cog" />
            Options
          </NavItem>
          <NavItem href="https://github.com/RESTEDClient/RESTED" target="_blank">
            <Fonticon icon="github" />
            GitHub
          </NavItem>
        </Nav>
      </Navbar>
    </StyledHeader>
  );
}

Header.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  darkMode: isDarkTheme(state),
});

export default connect(mapStateToProps, modalActions)(Header);

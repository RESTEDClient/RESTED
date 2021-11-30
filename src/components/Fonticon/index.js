import React, { PropTypes } from 'react';
import classNames from 'classnames';

import { StyledFonticon } from './StyledComponents';

function Fonticon({ icon, className }) {
  return (
    <StyledFonticon>
      <i
        className={classNames('fa', `fa-${icon}`, className)}
        role="presentation"
      />
    </StyledFonticon>
  );
}

Fonticon.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Fonticon;


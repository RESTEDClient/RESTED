import React, { PropTypes } from 'react';
import classNames from 'classnames';

function Fonticon({ icon, className }) {
  return (
    <i
      className={classNames('fa', `fa-${icon}`, className)}
      role="presentation"
    />
  );
}

Fonticon.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Fonticon;


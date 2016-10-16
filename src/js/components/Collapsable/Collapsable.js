import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Collapse } from 'react-bootstrap';

import * as Actions from '../../redux/collapsable/actions';

export function Collapsable(props) {
  return (
    <div id={props.id}>
      <div>
        <h3>
          {props.title}
        </h3>
        <i
          className={classNames('fa fa-angle-right', {
            'fa-rotate-90': props.open,
          })}
        />
      </div>
      <Collapse
        in={props.open}
      >
        {props.children}
      </Collapse>
    </div>
  );
}

Collapsable.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  open: PropTypes.bool,
};

function mapStateToProps({ collapsable }, { id }) {
  const open = collapsable && collapsable[id] && collapsable[id].expanded;

  return { open };
}

export default connect(mapStateToProps, Actions)(Collapsable);


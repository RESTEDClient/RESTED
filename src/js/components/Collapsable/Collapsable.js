import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Button, Collapse, Row, Col } from 'react-bootstrap';

import * as Actions from '../../store/collapsable/actions';

export function Collapsable({ id, title, open, children, toggleCollapse }) {
  return (
    <Row>
      <Button
        bsStyle="link"
        onClick={e => {
          e.preventDefault();
          toggleCollapse(id, !!open);
        }}
      >
        <h4>
          {title}
          <i
            className={classNames('fa fa-angle-right', {
              'fa-rotate-90': open,
            })}
          />
        </h4>
      </Button>
      <Collapse in={open}>
        <Col xs={12}>
          {children}
        </Col>
      </Collapse>
    </Row>
  );
}

Collapsable.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  toggleCollapse: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

const mapStateToProps = ({ collapsable }, { id }) => ({
  open: collapsable && collapsable[id] && collapsable[id].expanded,
});

const mapDispatchToProps = dispatch => ({
  toggleCollapse(id, open) {
    const action = open
      ? Actions.collapse(id)
      : Actions.expand(id);
    dispatch(action);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Collapsable);


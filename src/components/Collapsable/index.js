import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Button, Collapse, Row, Col } from 'react-bootstrap';

import Fonticon from 'components/Fonticon';
import * as Actions from 'store/config/actions';
import { isOpen } from 'store/config/selectors';

import { StyledCollapsable } from './StyledComponents';

export function Collapsable(props) {
  const {
    id,
    title,
    open,
    children,
    toggleCollapse,
    mountOnEnter,
    unmountOnExit,
  } = props;
  return (
    <StyledCollapsable>
      <Button
        bsStyle="link"
        onClick={e => {
          e.preventDefault();
          toggleCollapse(id, open);
        }}
      >
        <h4>
          {title}
          <Fonticon
            icon="angle-right"
            className={classNames({
              'fa-rotate-90': open,
            })}
          />
        </h4>
      </Button>
      <Collapse
        in={open}
        mountOnEnter={mountOnEnter}
        unmountOnExit={unmountOnExit}
      >
        <Row>
          <Col xs={12}>
            {children}
          </Col>
        </Row>
      </Collapse>
    </StyledCollapsable>
  );
}

Collapsable.defaultProps = {
  mountOnEnter: false,
  unmountOnExit: false,
  open: false,
};

Collapsable.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  toggleCollapse: PropTypes.func.isRequired,
  mountOnEnter: PropTypes.bool,
  unmountOnExit: PropTypes.bool,
  open: PropTypes.bool,
};

const mapStateToProps = (state, props) => ({
  open: isOpen(state, props),
});

export default connect(mapStateToProps, Actions)(Collapsable);


import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import md5 from 'md5';

import modalPropTypes from '../../propTypes/modal';
import * as Actions from '../../store/modal/actions';

function ModalComponent({ modal, removeModal }) {
  return (
    <Modal show={modal.visible}>
      <Modal.Header>
        <Modal.Title>
          {modal.title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {modal.body}
      </Modal.Body>

      <Modal.Footer>
        {modal.actions && modal.actions.map(action => (
          <Button
            key={md5(action)}
            data-dismiss="modal"
            onClick={action.click}
          >
            {action.text}
          </Button>
        ))}
        <Button
          onClick={() => {
            if (modal.cancelClick) {
              modal.cancelClick();
            }
            removeModal();
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ModalComponent.propTypes = {
  modal: PropTypes.oneOfType([
    modalPropTypes.isRequired, // Visible state
    PropTypes.shape({          // Hidden state
      visible: PropTypes.oneOf([false]).isRequired, // eslint-disable-line react/no-unused-prop-types
    }).isRequired,
  ]).isRequired,
  removeModal: PropTypes.func.isRequired,
};

function mapStateToProps({ modal }) {
  return { modal };
}

export default connect(mapStateToProps, Actions)(ModalComponent);


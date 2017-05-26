import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

import modalPropTypes from 'propTypes/modal';
import * as Actions from 'store/modal/actions';

function ModalComponent({ modal, removeModal, clearModalData }) {
  const handleCancelClick = () => {
    if (modal.cancelClick) {
      modal.cancelClick();
    }
    removeModal();
  };

  return (
    <Modal
      show={modal.visible}
      onHide={handleCancelClick}
      onExited={clearModalData}
    >
      <Modal.Header>
        <Modal.Title>
          {modal.title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {modal.body}
      </Modal.Body>

      <Modal.Footer>
        {modal.actions && modal.actions.map((action, index) => (
          <Button
            key={index}
            data-dismiss="modal"
            onClick={action.click}
          >
            {action.text}
          </Button>
        ))}
        <Button onClick={handleCancelClick}>
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
      // eslint-disable-next-line react/no-unused-prop-types
      visible: PropTypes.oneOf([false]).isRequired,
    }).isRequired,
  ]).isRequired,
  removeModal: PropTypes.func.isRequired,
  clearModalData: PropTypes.func.isRequired,
};

function mapStateToProps({ modal }) {
  return { modal };
}

export default connect(mapStateToProps, Actions)(ModalComponent);


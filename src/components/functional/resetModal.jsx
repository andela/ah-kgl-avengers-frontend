import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Modal, ModalHeader, ModalBody,
} from 'reactstrap';

const ResetConfirmationModal = ({ modal, toggle }) => (
  <Container>
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Reset Password</ModalHeader>
      <ModalBody className="w3-card">
        <h4 className="mb-2">Check your inbox</h4>
        <p>
          Follow instruction sent to your email for resetting password of your account.
        </p>
      </ModalBody>
    </Modal>
  </Container>
);

ResetConfirmationModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default ResetConfirmationModal;

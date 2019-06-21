import React from 'react';
import {
  Modal, ModalHeader, ModalBody, Button, ModalFooter,
} from 'reactstrap';
import PropTypes, { bool } from 'prop-types';

const DeleteConfirmation = ({
  modal, toggle, deleteArticle, slug,
}) => (
  <Modal isOpen={modal} toggle={toggle}>
    <ModalHeader toggle={toggle}>Delete</ModalHeader>
    <ModalBody>Are you sure you want to delete this? </ModalBody>
    <ModalFooter>
      <Button color="danger" onClick={() => deleteArticle(slug)}>
        Yes
      </Button>
      <Button outline color="primary" onClick={toggle}>
        No
      </Button>
    </ModalFooter>
  </Modal>
);

DeleteConfirmation.propTypes = {
  modal: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
};
export default DeleteConfirmation;

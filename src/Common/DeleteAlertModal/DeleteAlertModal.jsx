import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import proptypes from 'prop-types';
import { confirmable, createConfirmation } from "react-confirm";

// eslint-disable-next-line react-refresh/only-export-components
const DeleteAlertModal = ({
    show,
    proceed = () => null,
  }) => {
  return (
      <Modal
        show={show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure you want to delete this item?.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => proceed(false)}>Cancel</Button>
          <Button variant="danger" onClick={() => proceed(true)}>Delete</Button>
        </Modal.Footer>
      </Modal>
  );
}

DeleteAlertModal.propTypes = {
  show: proptypes.bool,
  proceed: proptypes.func,
}

export function deleteConfirm(
  options = {}
) {
  return createConfirmation(confirmable(DeleteAlertModal))({
    ...options
  });
}
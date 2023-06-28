import { Button, Modal } from 'react-bootstrap';
import proptypes from 'prop-types';

const DeleteAlertModal = ({
    show,
    onConfirm,
    onCancel,
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
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button variant="danger" onClick={onConfirm}>Delete</Button>
        </Modal.Footer>
      </Modal>
  );
}

DeleteAlertModal.propTypes = {
  onCancel: proptypes.func,
  onConfirm: proptypes.func,
  show: proptypes.bool,
}

export default DeleteAlertModal;
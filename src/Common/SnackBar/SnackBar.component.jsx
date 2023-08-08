import { Toast, ToastContainer } from 'react-bootstrap';
import proptypes from 'prop-types';
import useAppState from "../../hooks/useAppState";

const SnackBar = () => {
  const { snackbar: { show, message, type }, closeSnackbar } = useAppState();

  return (
    <ToastContainer
      position="bottom-center"
      className="p-3"
      style={{ zIndex: 1 }}
    >
      <Toast
        onClose={closeSnackbar}
        show={show}
        bg={type}
        delay={3000}
        autohide
      >
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

SnackBar.propTypes = {
  message: proptypes.string,
  show: proptypes.bool,
  setShow: proptypes.func,
}

export default SnackBar;
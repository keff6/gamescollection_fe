import { useState, useEffect, useContext } from 'react';
import { Button, Modal, Form} from 'react-bootstrap';
import proptypes from 'prop-types';
import { AppState } from "../../Config/store/state";

const GenreForm = ({
  addNewGenre,
  isEdit,
  onHide,
  saveUpdatedChanges,
  show,
  ...rest
}) => {
  const { genre: {selected}, setSelectedGenre } = useContext(AppState);
  const [genreName, setGenreName] = useState('');
  const [validated, setValidated] = useState(false);

  useEffect(() => () => {
      setGenreName('')
      setValidated(false)
  },[show])

  useEffect(() => {
    if(isEdit) setGenreName(selected.name)
  },[isEdit])

  const handleGenreNameChange = (e) => {
    setGenreName(e.target.value)
  }

  const validateForm = (formValues) => {
    let isValid = false;
    if (formValues.checkValidity()) isValid = true
    setValidated(true)
    return isValid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget;

    if(validateForm(form)) {
      if(isEdit) await saveUpdatedChanges(selected.id, genreName)
      else await addNewGenre(genreName)
    }
    closeForm()
  }

  const closeForm = () => {
    setSelectedGenre(null)
    onHide()
  }

  return (
    <Modal
      {...rest}
      show={show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton={false}>
        <Modal.Title id="contained-modal-title-vcenter">
          {isEdit ? 'Edit' : 'Add'} Genre
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="genreForm" noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="genreName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter genre name"
              value={genreName}
              onChange={handleGenreNameChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid text.
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeForm}>Cancel</Button>
        <Button variant="primary" form="genreForm" type="submit">Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
}

GenreForm.propTypes = {
  addNewGenre: proptypes.func,
  isEdit: proptypes.bool,
  onHide: proptypes.func,
  saveUpdatedChanges: proptypes.func,
  show: proptypes.bool,
}

export default GenreForm
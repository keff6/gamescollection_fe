import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import proptypes from 'prop-types';

const GenreForm = ({ genre, onHide, show, addNewGenre, ...rest}) => {
  const [genreName, setGenreName] = useState('');
  const [validated, setValidated] = useState(false);

  useEffect(() => () => {
    setGenreName('')
    setValidated(false)
  },[show])

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
      await addNewGenre(genreName)
    }
    onHide()
  }

  return (
    <Modal
      {...rest}
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton={false}>
        <Modal.Title id="contained-modal-title-vcenter">
          {genre ? 'Edit' : 'Add'} Genre
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
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" form="genreForm" type="submit">Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
}

GenreForm.propTypes = {
  onHide: proptypes.func,
  addNewGenre: proptypes.func,
  genre: proptypes.object,
  show: proptypes.bool,
}

export default GenreForm
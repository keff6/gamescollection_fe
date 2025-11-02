import { useState, useEffect } from 'react';
import { Button, Modal, Form} from 'react-bootstrap';
import proptypes from 'prop-types';
import { useAppState } from '../../hooks';

const GenreForm = ({
  addNewGenre,
  isEdit,
  onHide,
  saveUpdatedChanges,
  show,
  ...rest
}) => {
  const { genre: {selected}, setSelectedGenre } = useAppState();
  const [genreName, setGenreName] = useState('');
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true)
    setErrors([])
    const form = e.currentTarget;

    if(validateForm(form)) {
      try {
        if(isEdit) await saveUpdatedChanges(selected.id, genreName)
        else await addNewGenre(genreName)
        closeForm()
      } catch(e) {
        setErrors(err => [...err, e])
      }
    }
    setIsSubmitting(false)
  }

  const closeForm = () => {
    setSelectedGenre(null)
    setErrors([])
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
        <Modal.Title id="contained-modal-title-vcenter" className='main-title'>
          {isEdit ? 'Edit' : 'Add'} Genre
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="genreForm" noValidate validated={validated} onSubmit={handleSubmit}>
          {errors.length > 0 && <div className="error-container">{errors.map((e, i) => <p key={i}>{e.message}</p>)}</div>}
          <Form.Group className="mb-3" controlId="genreName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter genre name"
              value={genreName}
              maxLength={45}
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
        <Button variant="primary" form="genreForm" type="submit" disabled={isSubmitting}>Save changes</Button>
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
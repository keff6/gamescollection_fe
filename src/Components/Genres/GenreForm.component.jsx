import { useState } from 'react';
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Modal, Form} from 'react-bootstrap';
import proptypes from 'prop-types';
import { useAppState } from '../../hooks';

const GENRE_DEFAULT = {
  name: '',
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Please enter a valid text"),
});

const GenreForm = ({
  addNewGenre,
  isEdit,
  onHide,
  saveUpdatedChanges,
  show,
  ...rest
}) => {
  const { genre: {selected}, setSelectedGenre } = useAppState();
  const [serverErrors, setServerErrors] = useState([]);

  const closeForm = () => {
    setSelectedGenre(null)
    setServerErrors([])
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
      <Formik
        initialValues={isEdit ? selected : GENRE_DEFAULT}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            if(isEdit) await saveUpdatedChanges(selected.id, values)
            else await addNewGenre(values)
            closeForm()
            resetForm();
          } catch(e) {
            setServerErrors(err => [...err, e])
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <>
            <Modal.Header closeButton={false}>
              <Modal.Title id="contained-modal-title-vcenter" className='main-title'>
                {isEdit ? 'Edit' : 'Add'} Genre
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form id="genreForm" noValidate onSubmit={handleSubmit}>
                {serverErrors.length > 0 && <div className="error-container">{serverErrors.map((e, i) => <p key={i}>{e.message}</p>)}</div>}
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter genre name"
                    value={values.name}
                    maxLength={45}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.name && !!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeForm}>Cancel</Button>
              <Button variant="primary" form="genreForm" type="submit" disabled={isSubmitting}>
                {isSubmitting ? '...Submitting' : 'Save changes'}
              </Button>
            </Modal.Footer>
          </>
        )}
      </Formik>
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
import { useState } from 'react';
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Modal, Form } from 'react-bootstrap';
import proptypes from 'prop-types';
import { useAppState } from '../../../hooks';

const BRAND_DEFAULT = {
  name: "",
  origin: "",
  logoUrl: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Please enter a valid text"),
});

const BrandForm = ({
  addNewBrand,
  isEdit,
  onHide,
  saveUpdatedChanges,
  show,
  ...rest
}) => {
  const { brand: {selected}, setSelectedBrand} = useAppState();
  const [serverErrors, setServerErrors] = useState([]);
  
  const closeForm = () => {
    setSelectedBrand(null)
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
        initialValues={isEdit ? selected : BRAND_DEFAULT}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            if(isEdit) await saveUpdatedChanges(selected.id, values)
            else await addNewBrand(values)
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
                {isEdit ? 'Edit' : 'Add'} Brand
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form id="brandForm" noValidate onSubmit={handleSubmit}>
                {serverErrors.length > 0 && <div className="error-container">{serverErrors.map((e, i) => <p key={i}>{e.message}</p>)}</div>}
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    maxLength={45}
                    placeholder="Enter brand name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.name && !!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="origin">
                  <Form.Label>Origin</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter brand origin"
                    maxLength={45}
                    value={values.origin}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.origin && !!errors.origin}
                  />
                </Form.Group>
                {/*  TODO: If using images is not viable then remove
                <Form.Group className="mb-3" controlId="logoUrl">
                  <Form.Label>Logo URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter logo url"
                    value={values.logoUrl}
                    maxLength={255}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.logoUrl && !!errors.logoUrl}
                  />
                </Form.Group> */}
              </Form>  
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeForm}>Cancel</Button>
              <Button variant="primary" form="brandForm" type="submit" disabled={isSubmitting}>
                {isSubmitting ? '...Submitting' : 'Save changes'}
              </Button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </Modal>
  );
}

BrandForm.propTypes = {
  addNewBrand: proptypes.func,
  isEdit: proptypes.bool,
  onHide: proptypes.func,
  saveUpdatedChanges: proptypes.func,
  show: proptypes.bool,
}

export default BrandForm
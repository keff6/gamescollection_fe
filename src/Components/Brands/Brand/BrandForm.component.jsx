import { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import proptypes from 'prop-types';
import { useAppState } from '../../../hooks';

const BRAND_DEFAULT = {
  name: "",
  origin: "",
  logoUrl: "",
};

const BrandForm = ({
  addNewBrand,
  isEdit,
  onHide,
  saveUpdatedChanges,
  show,
  ...rest
}) => {
  const { brand: {selected}, setSelectedBrand} = useAppState();
  const [brandObj, setBrandObj] = useState(BRAND_DEFAULT);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => () => {
      setBrandObj(BRAND_DEFAULT)
      setValidated(false)
  },[show])

  useEffect(() => {
    if(isEdit) setBrandObj(selected)
  },[isEdit])

  const handleChange = (field, value) => {
    setBrandObj({
      ...brandObj,
      [field]: value
    }) 
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
        if(isEdit) await saveUpdatedChanges(selected.id, brandObj)
        else await addNewBrand(brandObj)
        closeForm()
      } catch(e) {
        setErrors(err => [...err, e])
      }
    }
    setIsSubmitting(false)
  }

  const closeForm = () => {
    setSelectedBrand(null)
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
        <Modal.Title id="contained-modal-title-vcenter">
          {isEdit ? 'Edit' : 'Add'} Brand
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="brandForm" noValidate validated={validated} onSubmit={handleSubmit}>
          {errors.length > 0 && <div className="error-container">{errors.map((e, i) => <p key={i}>{e.message}</p>)}</div>}
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              maxLength={45}
              placeholder="Enter brand name"
              value={brandObj.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid text.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="brandOrigin">
            <Form.Label>Origin</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter brand origin"
              maxLength={45}
              value={brandObj.origin}
              onChange={(e) => handleChange("origin", e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="brandLogoUrl">
            <Form.Label>Logo URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter logo url"
              value={brandObj.logoUrl}
              maxLength={255}
              onChange={(e) => handleChange("logoUrl", e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeForm}>Cancel</Button>
        <Button variant="primary" form="brandForm" type="submit" disabled={isSubmitting}>Save changes</Button>
      </Modal.Footer>
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
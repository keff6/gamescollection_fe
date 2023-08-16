import { useState, useEffect } from 'react';
import { Button, Modal, Form} from 'react-bootstrap';
import proptypes from 'prop-types';
import useAppState from '../../../hooks/useAppState';

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
  const hasValidChanges = brandObj.name.length > 0 && (selected ? brandObj.name.length !== selected.name : true);

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
    const form = e.currentTarget;

    if(validateForm(form)) {
      if(isEdit) await saveUpdatedChanges(selected.id, brandObj)
      else await addNewBrand(brandObj)
      closeForm()
    }
  }

  const closeForm = () => {
    setSelectedBrand(null)
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
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
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
              onChange={(e) => handleChange("logoUrl", e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeForm}>Cancel</Button>
        <Button variant="primary" form="brandForm" type="submit" disabled={!hasValidChanges}>Save changes</Button>
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
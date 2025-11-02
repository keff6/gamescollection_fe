import { useState, useEffect } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import proptypes from 'prop-types';
import { useAppState } from '../../hooks';
import { CONSOLE_GENERATIONS } from "../../utils/constants";

const CONSOLE_DEFAULT = {
  name: "",
  shortName: "",
  brandId: "",
  year: "",
  generation: "",
  isPortable: 0,
  logoUrl: "",
  consoleUrl: "",
};

const ConsoleForm = ({
  addNewConsole,
  isEdit,
  onHide,
  saveUpdatedChanges,
  show,
  currentBrandId,
  ...rest
}) => {
  const { console: {selected}, setSelectedConsole, misc: { brands }} = useAppState();
  const [consoleObj, setConsoleObj] = useState(CONSOLE_DEFAULT);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setConsoleObj({
      ...CONSOLE_DEFAULT,
      ...(currentBrandId && { brandId: currentBrandId }),
    });
    return () => {
      setConsoleObj(CONSOLE_DEFAULT)
      setValidated(false)
    }
  },[show])

  useEffect(() => {
    if(isEdit) setConsoleObj(selected)
  },[isEdit])

  const handleChange = (field, value) => {
    setConsoleObj({
      ...consoleObj,
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
    e.preventDefault();
    setIsSubmitting(true)
    setErrors([])
    const form = e.currentTarget;

    if(validateForm(form)) {
      try {
        if(isEdit) await saveUpdatedChanges(selected.id, consoleObj)
        else await addNewConsole(consoleObj)

        closeForm()
      } catch(e) {
        setErrors(err => [...err, e])
      }
    }
    setIsSubmitting(false)
  }

  const closeForm = () => {
    setSelectedConsole(null)
    setErrors([])
    onHide()
  }

  const renderYearsSelect = () => {
    let options = []
    for(let i = 1970; i<=2020; i++) {
      options.push(<option key={i} value={i}>{i}</option>)
    }
    return options
  }

  const handleCheckBoxChange = (field, value) => {
    setConsoleObj({
      ...consoleObj,
      [field]: value
    }) 
  }

  return (
    <Modal
      {...rest}
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      fullscreen="md-down"
      centered
    >
      <Modal.Header closeButton={false}>
        <Modal.Title id="contained-modal-title-vcenter" className='main-title'>
          {isEdit ? 'Edit' : 'Add'} Console
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="consoleForm" noValidate validated={validated} onSubmit={handleSubmit}>
          {errors.length > 0 && <div className="error-container">{errors.map((e, i) => <p key={i}>{e.message}</p>)}</div>}
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              maxLength={50}
              placeholder="Enter console name"
              value={consoleObj.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid text.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Short Name</Form.Label>
            <Form.Control
              type="text"
              name="shortName"
              maxLength={50}
              placeholder="Enter console short name or acronym"
              value={consoleObj.shortName}
              onChange={(e) => handleChange("shortName", e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Select
              aria-label="brand"
              value={consoleObj.brandId || ''}
              onChange={(e) => handleChange("brandId", e.target.value)}
              disabled={consoleObj.brandId}
              required
            >
              <option value=''>Select a brand</option>
              {brands?.map(b =>
                <option key={b.id} value={b.id}>{b.name}</option>
              )}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a valid brand.
            </Form.Control.Feedback>
          </Form.Group>
          <Row className="form-row">
            <Col md={6}>
              <Form.Group className="mb-3" controlId="consoleYear">
                <Form.Label>Year</Form.Label>
                <Form.Select
                  aria-label="year"
                  value={consoleObj.year || ''}
                  onChange={(e) => handleChange("year", e.target.value)}
                >
                  <option value=''>Enter console release year (America)</option>
                  {renderYearsSelect()}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="consoleGeneration">
                <Form.Label>Generation</Form.Label>
                <Form.Select
                  aria-label="generation"
                  value={consoleObj.generation || ''}
                  onChange={(e) => handleChange("generation", e.target.value)}
                >
                  <option value=''>Select console generation</option>
                  {CONSOLE_GENERATIONS.map(c => 
                    <option key={c.value} value={c.value}>{c.text}</option>    
                    )}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="name">
            <Form.Check
              type="checkbox"
              id="isPortable"
              name="isPortable"
              label="Is Portable"
              checked={consoleObj.isPortable}
              onChange={(e) => handleCheckBoxChange("isPortable", e.target.checked)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="logoUrl">
            <Form.Label>Logo URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter logo url"
              maxLength={255}
              value={consoleObj.logoUrl}
              onChange={(e) => handleChange("logoUrl", e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="consoleUrl">
            <Form.Label>Console Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter console image url"
              maxLength={255}
              value={consoleObj.consoleUrl}
              onChange={(e) => handleChange("consoleUrl", e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeForm}>Cancel</Button>
        <Button variant="primary" form="consoleForm" type="submit" disabled={isSubmitting}>Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
}

ConsoleForm.propTypes = {
  addNewConsole: proptypes.func,
  currentBrandId: proptypes.string,
  isEdit: proptypes.bool,
  onHide: proptypes.func,
  saveUpdatedChanges: proptypes.func,
  show: proptypes.bool,
}

export default ConsoleForm
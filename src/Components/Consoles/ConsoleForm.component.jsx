import { useState, useMemo } from 'react';
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import proptypes from 'prop-types';
import { useAppState } from '../../hooks';
import { FormikSelect } from '../../Common';
import { parseOptions } from '../../utils/parseOptions';
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

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Please enter a valid text"),
  brandId: Yup.string()
    .required("Please select a valid brand"),
});

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
  const [serverErrors, setServerErrors] = useState([]);

  const closeForm = () => {
    setSelectedConsole(null)
    setServerErrors([])
    onHide()
  }

  const years = useMemo(() => {
      let options = []
      const currentYear = new Date().getFullYear();
      for(let i = 1970; i<=currentYear; i++) {
        options.push({ value: i.toString(), label: i})
      }
      return options
    }, [])

  return (
    <Modal
      {...rest}
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      fullscreen="md-down"
      centered
    >
      <Formik
        initialValues={isEdit ? selected : {...CONSOLE_DEFAULT, brandId: currentBrandId}}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            if(isEdit) await saveUpdatedChanges(selected.id, values)
            else await addNewConsole(values)
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
          setFieldValue,
          setFieldTouched,
        }) => (
          <>
            <Modal.Header closeButton={false}>
              <Modal.Title id="contained-modal-title-vcenter" className='main-title'>
                {isEdit ? 'Edit' : 'Add'} Console
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form id="consoleForm" noValidate onSubmit={handleSubmit}>
                {serverErrors.length > 0 && <div className="error-container">{serverErrors.map((e, i) => <p key={i}>{e.message}</p>)}</div>}
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    maxLength={50}
                    placeholder="Enter console name"
                    value={values.name || ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.name && !!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="shortName">
                  <Form.Label>Short Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="shortName"
                    maxLength={50}
                    placeholder="Enter console short name or acronym"
                    value={values.shortName || ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.shortName && !!errors.shortName}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="brandId">
                  <Form.Label>Brand</Form.Label>
                  <FormikSelect
                    name="brandId"
                    options={parseOptions(brands, "id", "name")}
                    placeholder='Select a brand'
                    values={values}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    isDisabled={!!values.brandId}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.brandId}
                  </Form.Control.Feedback>
                </Form.Group>
                <Row className="form-row">
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="year">
                      <Form.Label>Year</Form.Label>
                      <FormikSelect
                        name="year"
                        options={years}
                        placeholder='Enter console release year (America)'
                        values={values}
                        setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="generation">
                      <Form.Label>Generation</Form.Label>
                      <FormikSelect
                        name="generation"
                        options={CONSOLE_GENERATIONS.map(c => ({
                          value: c.value,
                          label: c.text
                        }))}
                        placeholder='Select console generation'
                        values={values}
                        setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3" controlId="isPortable">
                  <Form.Check
                    type="checkbox"
                    id="isPortable"
                    name="isPortable"
                    label="Is Portable"
                    checked={values.isPortable || 0}
                    onChange={(e) => setFieldValue('isPortable', e.target.checked)}
                    onBlur={handleBlur}
                  />
                </Form.Group>
                {/*  TODO: If using images is not viable then remove
                <Form.Group className="mb-3" controlId="logoUrl">
                  <Form.Label>Logo URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter logo url"
                    maxLength={255}
                    value={values.logoUrl || ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="consoleUrl">
                  <Form.Label>Console Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter console image url"
                    maxLength={255}
                    value={values.consoleUrl || ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Group> */}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeForm}>Cancel</Button>
              <Button variant="primary" form="consoleForm" type="submit" disabled={isSubmitting}>
                {isSubmitting ? '...Saving' : 'Save changes'}
              </Button>
            </Modal.Footer>
          </>
        )}
      </Formik>
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
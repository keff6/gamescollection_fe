import { useState, useEffect } from 'react'
import proptypes from 'prop-types';
import { Container, Col, Row, Button, Form } from 'react-bootstrap';
import { Select } from '../../Common';
import classes from './ExportData.module.css';

const ExportData = ({ brands = [], consoles = [], getConsolesByBrand, exportData }) => {
  const brandOptions = [{ value: 'all', label: 'All Brands' }, ...brands]
  const defaultBrand = brandOptions.find(opt => opt.value === 'all');
  const consoleOptions = [{ value: 'all', label: 'All Consoles' }, ...consoles]
  const defaultConsole = consoleOptions.find(opt => opt.value === 'all');

  const [selectedConsole, setSelectedConsole] = useState(defaultConsole);
  const [selectedBrand, setSelectedBrand] = useState(defaultBrand);

  useEffect(() => {
    setSelectedConsole(defaultConsole)
    getConsolesByBrand(selectedBrand.value)
  }, [selectedBrand, getConsolesByBrand])

  const handleExport = (e) => {
    e.preventDefault();
    exportData(selectedBrand.value, selectedConsole.value)
  }

  return (
    <div className={classes.exportContainer}>
      <h2 className='main-title'>Export Data</h2>
      <Container>
        <Row>
          <Col md={12} lg={6}>
            <h6 className='sub-title-2'>Export all or specific games to Excel</h6>
            <Form id="exportForm" noValidate onSubmit={handleExport}>
              <Form.Group className="mb-3" controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Select
                  name="brand"
                  options={brandOptions}
                  defaultValue={defaultBrand}
                  value={selectedBrand}
                  onChange={setSelectedBrand}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="console">
                <Form.Label>Console</Form.Label>
                <Select
                  name="console"
                  options={consoleOptions}
                  defaultValue={defaultConsole}
                  value={selectedConsole}
                  onChange={setSelectedConsole}
                  isDisabled={defaultBrand.value === selectedBrand.value}
                />
              </Form.Group>
              <Button
                variant="primary"
                form="exportForm"
                type="submit"
              >
                Export
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

ExportData.propTypes = {
  brands: proptypes.array,
  consoles: proptypes.array,
  getConsolesByBrand: proptypes.func,
  exportData: proptypes.func,
}

export default ExportData;

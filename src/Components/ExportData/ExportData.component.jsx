import { useState, useEffect } from 'react'
import proptypes from 'prop-types';
import { Container, Col, Row, Button, Form } from 'react-bootstrap';
import classes from './ExportData.module.css';

const ExportData = ({ brands = [], consoles = [], getConsolesByBrand, exportData }) => {
  const [selectedConsole, setSelectedConsole] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');

  useEffect(() => {
    setSelectedConsole('all')
    getConsolesByBrand(selectedBrand)
  }, [selectedBrand, getConsolesByBrand])

  const handleExport = (e) => {
    e.preventDefault();
    console.log('exported', selectedBrand, selectedConsole)
    exportData(selectedBrand, selectedConsole)
  }

  return (
    <div className={classes.exportContainer}>
      <h2>Export Data</h2>
      <Container>
        <Row>
          <Col md={12} lg={6}>
            <h6>Export all or specific games to Excel</h6>
            <Form id="exportForm" noValidate onSubmit={handleExport}>
              <Form.Group className="mb-3" controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Select
                  aria-label="brand"
                  name="brand"
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                >
                  <option value='all'>All Brands</option>
                  {brands && brands?.map(c =>
                    <option key={c.id} value={c.id}>{c.name}</option>
                  )}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="console">
                <Form.Label>Console</Form.Label>
                <Form.Select
                  aria-label="console"
                  name="console"
                  value={selectedConsole || ''}
                  onChange={(e) => setSelectedConsole(e.target.value)}
                  disabled={selectedBrand === 'all'}
                  required
                >
                  <option value='all'>All Consoles</option>
                  {consoles && consoles?.map(c =>
                    <option key={c.id} value={c.id}>{c.name}</option>
                  )}
                </Form.Select>
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

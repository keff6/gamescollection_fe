import { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import proptypes from 'prop-types';
import { useAppState } from '../../../hooks';
import BrandsTable from './BrandsTable.component';
import BrandForm from './BrandForm.component';
import DeleteAlertModal from '../../../Common/DeleteAlertModal/DeleteAlertModal.component';
import classes from './Brands.module.css';

const Brands = ({
  addBrand,
  deleteBrand,
  updateBrand,
}) => {
  const { brand, setSelectedBrand } = useAppState();
  const [showForm, setShowForm] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleDeleteBrand = async (selectedBrand) => {
    setSelectedBrand({...selectedBrand})
    setShowConfirmDelete(true)
  }

  const handleEditBrand = (selectedBrand) => {
    setSelectedBrand({...selectedBrand})
    setIsEdit(true)
    setShowForm(true)
  }

  const handleCloseFormModal = () => {
    setIsEdit(false)
    setShowForm(false)
  }

  const handleCancelDelete = () => {
    setSelectedBrand(null)
    setShowConfirmDelete(false)
  }

  const handleConfirmDelete = () => {
    deleteBrand(brand.selected)
    setSelectedBrand(null)
    setShowConfirmDelete(false)
  }

  return (
    <>
      <BrandForm
        show={showForm}
        onHide={handleCloseFormModal}
        isEdit={isEdit}
        addNewBrand={addBrand}
        saveUpdatedChanges={updateBrand}
      />
      <Container className={classes.container}>
        <header className={classes.header}>
          <h2>Brands</h2>
          <Button className="d-none d-md-block" onClick={() => setShowForm(true)}>Add Brand</Button>
          <Button className="d-block d-md-none" onClick={() => setShowForm(true)}>Add+</Button>
        </header>
        <BrandsTable
          brands={brand.list}
          deleteBrand={handleDeleteBrand}
          editBrand={handleEditBrand}
        />
      </Container>
      <DeleteAlertModal
        show={showConfirmDelete}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}

Brands.propTypes = {
  addBrand: proptypes.func,
  deleteBrand: proptypes.func,
  updateBrand: proptypes.func,
}

export default Brands;
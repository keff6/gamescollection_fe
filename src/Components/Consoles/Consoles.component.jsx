import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import proptypes from 'prop-types';
import useAppState from '../../hooks/useAppState';
import ConsolesList from "./ConsolesList.component";
import { DeleteAlertModal,Breadcrumb } from "../../Common"
import ConsoleForm from './ConsoleForm.component';
import ConsoleDetails from './ConsoleDetails.component';
import classes from './Consoles.module.css';

const NavigationItems = [
  { text: 'Brands', href:"/" },
  { text: 'Consoles', href:"id:/consoles", active: true}
];

const Consoles = ({
  addConsole,
  deleteConsole,
  updateConsole,
}) => {
  const navigate = useNavigate();
  const { console, setSelectedConsole, brand: { selected: selectedBrand } } = useAppState();
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const currentBrand = selectedBrand ? selectedBrand : JSON.parse(sessionStorage.getItem('brandData'));

  if(!currentBrand) {
    navigate('/', { replace: true });
  }

  const handleAddNewConsole = async (consoleObj) => {
    addConsole(consoleObj)
  }

  const handleDeleteConsole = async (selectedConsole) => {
    setSelectedConsole({...selectedConsole})
    setShowConfirmDelete(true)
  }

  const handleEditConsole = (selectedConsole) => {
    setSelectedConsole({...selectedConsole})
    setIsEdit(true)
    setShowForm(true)
  }

  const handleViewDetails = (selectedConsole) => {
    setSelectedConsole({...selectedConsole})
    setShowDetails(true)
  }

  const handleUpdateConsole = async (consoleId, updatedConsoleObj) => {
    updateConsole(consoleId, updatedConsoleObj)
  }

  const handleCloseFormModal = () => {
    setIsEdit(false)
    setShowForm(false)
  }

  const handleCloseDetailsModal = () => {
    setShowDetails(false)
  }

  const handleCancelDelete = () => {
    setSelectedConsole(null)
    setShowConfirmDelete(false)
  }

  const handleConfirmDelete = () => {
    deleteConsole(console.selected)
    setSelectedConsole(null)
    setShowConfirmDelete(false)
  }

  return (
    <>
      <Breadcrumb items={NavigationItems} />
      <div>
        <header className={classes.header}>
          <div className={classes.consolesHeader}>
            <h2>{currentBrand?.name}</h2>
          </div>
          <Button className="d-none d-md-block" onClick={() => setShowForm(true)}>Add Console</Button>
          <Button className="d-block d-md-none" onClick={() => setShowForm(true)}>Add+</Button>
        </header>
      </div>
      <ConsolesList
        consoles={console.list}
        editConsole={handleEditConsole}
        deleteConsole={handleDeleteConsole}
        viewDetails={handleViewDetails}
      />
      <ConsoleForm
        show={showForm}
        onHide={handleCloseFormModal}
        isEdit={isEdit}
        addNewConsole={handleAddNewConsole}
        saveUpdatedChanges={handleUpdateConsole}
      />
      <DeleteAlertModal
        show={showConfirmDelete}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
      <ConsoleDetails
        show={showDetails}
        onHide={handleCloseDetailsModal}
      />
    </>
  )
}

Consoles.propTypes = {
  addConsole: proptypes.func,
  deleteConsole: proptypes.func,
  updateConsole: proptypes.func,
}

export default Consoles;
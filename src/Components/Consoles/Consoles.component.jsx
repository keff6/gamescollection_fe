import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import proptypes from 'prop-types';
import { useAppState, useSessionStorage } from '../../hooks';
import ConsolesList from "./ConsolesList.component";
import { DeleteAlertModal,Breadcrumb } from "../../Common";
import ConsoleForm from './ConsoleForm.component';
import ConsoleFilterOptions from './ConsoleFilterOptions';
import { SESSION_STORAGE } from '../../utils/constants';
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
  const { console, setSelectedConsole, brand: { selected: selectedBrand }, user } = useAppState();
  const [storedUser] = useSessionStorage(SESSION_STORAGE.USER, null)
  const [storedBrand] = useSessionStorage(SESSION_STORAGE.BRAND, null)

  const [showForm, setShowForm] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const currentBrand = selectedBrand ? selectedBrand : storedBrand;
  const totalConsoles = console?.total || 0;
  const currentUser = user || storedUser || null;
  
  useEffect(() => {
    if(!currentBrand) {
      navigate('/', { replace: true });
    }
  },[]);

  const handleDeleteConsole = async (selectedConsole) => {
    setSelectedConsole({...selectedConsole})
    setShowConfirmDelete(true)
  }

  const handleEditConsole = (selectedConsole) => {
    setSelectedConsole({...selectedConsole})
    setIsEdit(true)
    setShowForm(true)
  }

  const handleCloseFormModal = () => {
    setIsEdit(false)
    setShowForm(false)
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
      <ConsoleForm
        show={showForm}
        onHide={handleCloseFormModal}
        isEdit={isEdit}
        addNewConsole={addConsole}
        saveUpdatedChanges={updateConsole}
        currentBrandId={currentBrand?.id}
      />
      <div>
        <header className={classes.header}>
          <div className={classes.consolesHeader}>
            <h2>{currentBrand?.name}</h2>
            <h5>{totalConsoles} {totalConsoles === 1 ? 'console' : 'consoles'}</h5>
          </div>
          {currentUser &&
          <>
            <Button className="d-none d-md-block" onClick={() => setShowForm(true)}>Add Console</Button>
            <Button className="d-block d-md-none" onClick={() => setShowForm(true)}>Add+</Button>
          </>}
        </header>
      </div>
      <ConsoleFilterOptions />
      <ConsolesList
        editConsole={handleEditConsole}
        deleteConsole={handleDeleteConsole}
      />
      
      <DeleteAlertModal
        show={showConfirmDelete}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
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
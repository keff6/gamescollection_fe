import { useState, useContext } from 'react';
import { Button } from "react-bootstrap";
import proptypes from 'prop-types';
import { AppState } from "../Config/store/state";
import ConsolesList from "./ConsolesList.component";
import { DeleteAlertModal,Breadcrumb } from "../Common"
import ConsoleForm from './ConsoleForm.component';
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
  const { console, setSelectedConsole } = useContext(AppState);
  const [showForm, setShowForm] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

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

  const handleUpdateConsole = async (consoleId, updatedConsoleObj) => {
    updateConsole(consoleId, updatedConsoleObj)
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
      <div>
        <header className={classes.header}>
          <h2>Consoles</h2>
          <Button onClick={() => setShowForm(true)}>Add Console</Button>
        </header>
      </div>
      <ConsolesList
        consoles={console.list}
        editConsole={handleEditConsole}
        deleteConsole={handleDeleteConsole}
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
    </>
  )
}

Consoles.propTypes = {
  addConsole: proptypes.func,
  deleteConsole: proptypes.func,
  updateConsole: proptypes.func,
}

export default Consoles;
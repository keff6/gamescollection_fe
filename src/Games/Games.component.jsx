import { useState, useContext } from 'react';
import { Button } from "react-bootstrap";
import proptypes from 'prop-types';
import { AppState } from "../Config/store/state";
// import ConsolesList from "./ConsolesList.component";
import { DeleteAlertModal,Breadcrumb } from "../Common"
// import ConsoleForm from './ConsoleForm.component';
import classes from './Games.module.css';

const NavigationItems = (consoleId) => [
  { text: 'Brands', href:"/" },
  { text: 'Consoles', href:`/${consoleId}/consoles` },
  { text: 'Games', href:"id:/games", active: true },
];

const Games = ({
  addGame,
  deleteGame,
  updateGame,
}) => {
  const { game, setSelectedGame, brand } = useContext(AppState);
  const [showForm, setShowForm] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // const handleAddNewGame = async (gameObj) => {
  //   addGame(gameObj)
  // }

  // const handleDeleteGame = async (selectedGame) => {
  //   setSelectedGame({...selectedGame})
  //   setShowConfirmDelete(true)
  // }

  // const handleEditGame = (selectedGame) => {
  //   setSelectedGame({...selectedGame})
  //   setIsEdit(true)
  //   setShowForm(true)
  // }

  // const handleUpdateGame = async (gameId, updatedGameObj) => {
  //   updateGame(gameId, updatedGameObj)
  // }

  // const handleCloseFormModal = () => {
  //   setIsEdit(false)
  //   setShowForm(false)
  // }

  const handleCancelDelete = () => {
    setSelectedGame(null)
    setShowConfirmDelete(false)
  }

  const handleConfirmDelete = () => {
    deleteGame(game.selected)
    setSelectedGame(null)
    setShowConfirmDelete(false)
  }

  return (
    <>
      <Breadcrumb items={NavigationItems(brand?.selected?.id)} />
      <div>
        <header className={classes.header}>
          <h2>Games</h2>
          <Button onClick={() => setShowForm(true)}>Add Game</Button>
        </header>
      </div>
      <p>games list</p>
      {/* <ConsolesList
        consoles={console.list}
        editConsole={handleEditConsole}
        deleteConsole={handleDeleteConsole}
      /> */}
      {/* <ConsoleForm
        show={showForm}
        onHide={handleCloseFormModal}
        isEdit={isEdit}
        addNewConsole={handleAddNewConsole}
        saveUpdatedChanges={handleUpdateConsole}
      /> */}
      <DeleteAlertModal
        show={showConfirmDelete}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}

Games.propTypes = {
  addConsole: proptypes.func,
  deleteConsole: proptypes.func,
  updateConsole: proptypes.func,
}

export default Games;
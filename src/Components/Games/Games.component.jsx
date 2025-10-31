import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import proptypes from 'prop-types';
import { useAppState, useSessionStorage } from '../../hooks';
import { DeleteAlertModal, Breadcrumb } from "../../Common"
import GamesListOptions from './GamesList/GamesListOptions.component';
import GamesList from './GamesList/GamesList.container';
import GameForm from './GameForm.component';
import { SESSION_STORAGE } from '../../utils/constants';
import classes from './Games.module.css';

const NavigationItems = (brandId) => [
  { text: 'Brands', href:"/brands" },
  { text: 'Consoles', href:`/${brandId}/consoles` },
  { text: 'Games', href:"id:/games", active: true },
];

const Games = ({
  addGame,
  deleteGame,
  updateGame,
  getGames,
}) => {
  const navigate = useNavigate();
  const { game, setSelectedGame, brand, console: gameConsole, user } = useAppState();
  const [showForm, setShowForm] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [storedUser] = useSessionStorage(SESSION_STORAGE.USER, null);
  const [storedBrand] = useSessionStorage(SESSION_STORAGE.BRAND, null);
  const [storedConsole] = useSessionStorage(SESSION_STORAGE.CONSOLE, null);
  const currentBrand = (brand?.selected) ? brand.selected : storedBrand; 
  const currentConsole = (gameConsole?.selected) ? gameConsole.selected : storedConsole; 
  const totalGames = currentConsole?.totalGames || 0;
  const currentUser = user || storedUser || null;

  useEffect(() => {
    if(!currentBrand || !currentConsole) {
      navigate('/', { replace: true });
    }
  }, []);

  const handleDeleteGame = async (selectedGame) => {
    setSelectedGame({...selectedGame})
    setShowConfirmDelete(true)
  }

  const handleEditGame = (selectedGame) => {
    setSelectedGame({...selectedGame})
    setIsEdit(true)
    setShowForm(true)
  }

  const handleCloseFormModal = () => {
    setIsEdit(false)
    setShowForm(false)
  }

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
      <Breadcrumb items={NavigationItems(currentBrand?.id)} />
      <div>
        <header className={classes.header}>
          <div className={classes.gamesHeader}>
            <h2>{currentConsole?.name}</h2>
            <h6>{currentBrand?.name}</h6>
            <h5>{totalGames} {totalGames === 1 ? 'game' : 'games'}</h5>
          </div>
          {currentUser &&
          <>
            <Button className="d-none d-md-block" onClick={() => setShowForm(true)}>Add Game</Button>
            <Button className="d-block d-md-none" onClick={() => setShowForm(true)}>Add+</Button>
          </>}
        </header>
      </div>
      <GamesListOptions getGames={getGames}/>
      <GamesList
        editGame={handleEditGame}
        deleteGame={handleDeleteGame}
        getGames={getGames}
        saveUpdatedChanges={updateGame}
      />
      <GameForm
        show={showForm}
        onHide={handleCloseFormModal}
        isEdit={isEdit}
        addNewGame={addGame}
        saveUpdatedChanges={updateGame}
        currentConsoleId={currentConsole?.id}
      />
      <DeleteAlertModal
        show={showConfirmDelete}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}

Games.propTypes = {
  addGame: proptypes.func,
  deleteGame: proptypes.func,
  getGames: proptypes.func,
  updateGame: proptypes.func,
}

export default Games;
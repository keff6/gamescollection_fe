import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import proptypes from 'prop-types';
import useAppState from '../../hooks/useAppState';
import { DeleteAlertModal, Breadcrumb } from "../../Common"
import { getAuthUser } from '../../utils/misc'
import GamesListOptions from './GamesList/GamesListOptions.component';
import GamesList from './GamesList/GamesList.container';
import classes from './Games.module.css';
import GameForm from './GameForm.component';
import GameDetails from './GameDetails.component';

const NavigationItems = (brandId) => [
  { text: 'Brands', href:"/" },
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
  const { game, setSelectedGame, brand, console, user } = useAppState();
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const currentBrand = (brand?.selected) ? brand.selected : JSON.parse(sessionStorage.getItem('brandData')); 
  const currentConsole = (console?.selected) ? console.selected : JSON.parse(sessionStorage.getItem('consoleData')); 
  const totalGames = currentConsole?.totalGames || 0;
  const currentUser = getAuthUser(user);

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

  const handleViewDetails = (selectedGame) => {
    setSelectedGame({...selectedGame})
    setShowDetails(true)
  }

  const handleCloseFormModal = () => {
    setIsEdit(false)
    setShowForm(false)
  }

  const handleCloseDetailsModal = () => {
    setShowDetails(false)
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
        viewDetails={handleViewDetails}
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
      <GameDetails
        show={showDetails}
        onHide={handleCloseDetailsModal}
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
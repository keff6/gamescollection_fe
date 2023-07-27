import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import proptypes from 'prop-types';
import { AppState } from "../../Config/store/state";
import { DeleteAlertModal,Breadcrumb } from "../../Common"
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
  getGamesByConsoleAndLetter,
  getWishlistByConsole,
  searchGames,
}) => {
  const navigate = useNavigate();
  const { game, setSelectedGame, brand, console } = useContext(AppState);
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const currentBrand = (brand?.selected) ? brand.selected : JSON.parse(sessionStorage.getItem('brandData')); 
  const currentConsole = (console?.selected) ? console.selected : JSON.parse(sessionStorage.getItem('consoleData')); 

  if(!currentBrand || !currentConsole) {
    navigate('/', { replace: true });
  }

  const handleAddNewGame = async (gameObj) => {
    addGame(gameObj)
  }

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

  const handleUpdateGame = async (gameId, updatedGameObj) => {
    updateGame(gameId, updatedGameObj)
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
          </div>
          <Button onClick={() => setShowForm(true)}>Add Game</Button>
        </header>
      </div>
      <GamesListOptions searchGames={searchGames}/>
      <GamesList
        editGame={handleEditGame}
        deleteGame={handleDeleteGame}
        getGamesByConsoleAndLetter={getGamesByConsoleAndLetter}
        getWishlistByConsole={getWishlistByConsole}
        viewDetails={handleViewDetails}
      />
      <GameForm
        show={showForm}
        onHide={handleCloseFormModal}
        isEdit={isEdit}
        addNewGame={handleAddNewGame}
        saveUpdatedChanges={handleUpdateGame}
        currentConsoleId={console?.selected?.id}
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
  getGamesByConsoleAndLetter: proptypes.func,
  getWishlistByConsole: proptypes.func,
  searchGames: proptypes.func,
  updateGame: proptypes.func,
}

export default Games;
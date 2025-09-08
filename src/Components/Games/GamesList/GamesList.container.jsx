import { useEffect } from "react";
import proptypes from 'prop-types';
import useAppState from "../../../hooks/useAppState";
import GamesList from "./GamesList.component";
import { GAME_LIST_OPTIONS } from "../../../utils/constants";
import Spinner from "../../../Common/Spinner/Spinner.component";


const GamesListContainer = ({
  editGame,
  deleteGame,
  getWishlistByConsole,
  getGamesByConsoleAndLetter,
  getGamesByConsole,
  viewDetails,
}) => {
  const { game, isLoading, setGamesList } = useAppState();

  useEffect(() => {
    const { listOption } = game;

    switch(listOption) {
      case GAME_LIST_OPTIONS.ALPHABET:
        getGamesByConsoleAndLetter();
        break;
      case GAME_LIST_OPTIONS.ALL:
        getGamesByConsole();
        break;
      case GAME_LIST_OPTIONS.WISHLIST:
        getWishlistByConsole();
        break;
      case GAME_LIST_OPTIONS.SEARCH:
        setGamesList([]);
        break;
      default:
        break;
    }
    
  }, [game.listOption, game.initialLetter]);

  return (isLoading ? <Spinner /> :
    <GamesList
      games={game.list}
      editGame={editGame}
      deleteGame={deleteGame}
      listOption={game.listOption}
      viewDetails={viewDetails}
    />
    )
}

GamesListContainer.propTypes ={
  editGame: proptypes.func,
  deleteGame: proptypes.func,
  getGamesByConsoleAndLetter: proptypes.func,
  getGamesByConsole: proptypes.func,
  getWishlistByConsole: proptypes.func,
  viewDetails: proptypes.func,
}

export default GamesListContainer
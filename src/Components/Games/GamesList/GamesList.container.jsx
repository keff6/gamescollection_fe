import { useEffect, useContext } from "react";
import proptypes from 'prop-types';
import { AppState } from "../../../Config/store/state";
import GamesList from "./GamesList.component";
import { GAME_LIST_OPTIONS } from "../../../utils/constants";
import Spinner from "../../../Common/Spinner/Spinner.component";


const GamesListContainer = ({
  editGame,
  deleteGame,
  getWishlistByConsole,
  getGamesByConsoleAndLetter,
}) => {
  const { game, isLoading } = useContext(AppState);

  useEffect(() => {
    const { listOption } = game;

    switch(listOption) {
      case GAME_LIST_OPTIONS.ALPHABET:
        getGamesByConsoleAndLetter();
        break;
      case GAME_LIST_OPTIONS.WISHLIST:
        getWishlistByConsole();
        break;
      case GAME_LIST_OPTIONS.SEARCH:
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
    />
    )
}

GamesListContainer.propTypes ={
  editGame: proptypes.func,
  deleteGame: proptypes.func,
  getGamesByConsoleAndLetter: proptypes.func,
  getWishlistByConsole: proptypes.func,
}

export default GamesListContainer
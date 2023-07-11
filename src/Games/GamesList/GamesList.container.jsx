import { useEffect, useContext } from "react";
import proptypes from 'prop-types';
import { useParams } from "react-router-dom";
import { AppState } from "../../Config/store/state";
import GamesList from "./GamesList.component";
import { ConsoleService, GameService, GenreService } from '../../services';
import { GAME_LIST_OPTIONS, OPERATION_OUTCOME } from "../../utils/constants";
import Spinner from "../../Common/Spinner/Spinner.component";


const GamesListContainer = ({
  editGame,
  deleteGame,
}) => {
  const { game, setGamesList, openSnackbar, setConsolesList, setGenresList, setIsLoading, isLoading } = useContext(AppState);
  const { consoleId } = useParams()

  useEffect(() => {
    const { listOption } = game;

    switch(listOption) {
      case GAME_LIST_OPTIONS.ALPHABET:
        getGamesByConsole();
        break;
      case GAME_LIST_OPTIONS.WISHLIST:
        getWishlistByConsole();
        break;
      case GAME_LIST_OPTIONS.SEARCH:
        break;
      default:
        break;
    }
    
  }, [game.listOption]);

  const getGamesByConsole = async () => {
    try {
      setIsLoading(true)
      const gamesResponse = await GameService.getByParams({idConsole: consoleId});
      const consolesResponse = await ConsoleService.getAll();
      const genresResponse = await GenreService.getAll();
      setGamesList(gamesResponse.data || []);
      setConsolesList(consolesResponse.data || []);
      setGenresList(genresResponse.data || []);
    }
    catch(e){
      console.log(e)
      openSnackbar({message: e.message, type: OPERATION_OUTCOME.FAILED})
    }
    finally {
      setIsLoading(false)
    }
  }


  const getWishlistByConsole = async () => {
    try {
      setIsLoading(true)
      const gamesResponse = await GameService.getWishlistByConsole(consoleId);
      const consolesResponse = await ConsoleService.getAll();
      const genresResponse = await GenreService.getAll();
      setGamesList(gamesResponse.data || []);
      setConsolesList(consolesResponse.data || []);
      setGenresList(genresResponse.data || []);
    }
    catch(e){
      console.log(e)
      openSnackbar({message: e.message, type: OPERATION_OUTCOME.FAILED})
    }
    finally {
      setIsLoading(false)
    }
  }

  

  return (isLoading ? <Spinner /> :
    <GamesList
      games={game.list}
      editGame={editGame}
      deleteGame={deleteGame}
    />
    )
}

GamesListContainer.propTypes ={
  editGame: proptypes.func,
  deleteGame: proptypes.func,
  getGamesByConsole: proptypes.func,
  getWishlistByConsole: proptypes.func,
}

export default GamesListContainer
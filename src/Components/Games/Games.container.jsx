import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppState } from "../../Config/store/state";
import { ConsoleService, GameService, GenreService } from '../../services';
import Games from "./Games.component";
import { OPERATION_OUTCOME } from "../../utils/constants";

const GamesContainer = () => {
  const { setGamesList, openSnackbar, setConsolesList, setGenresList, setIsLoading } = useContext(AppState);
  const { consoleId } = useParams()

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

  const addGame = async (gameObj) => {
    try {
      setIsLoading(true)
      const response = await GameService.add(gameObj);
      openSnackbar({message: response.data, type: OPERATION_OUTCOME.SUCCESS})
    }
    catch(e){
      console.log(e)
      openSnackbar({message: e.message, type: OPERATION_OUTCOME.FAILED})
    }
    finally {
      getGamesByConsole()
    }
  }

  const updateGame = async (gameId, gameObj) => {
    try {
        setIsLoading(true)
        const response = await GameService.update(gameId, gameObj);
        openSnackbar({message: response.data, type: OPERATION_OUTCOME.SUCCESS})
      }
      catch(e){
        console.log(e)
        openSnackbar({message: e.message, type: OPERATION_OUTCOME.FAILED})
      }
      finally {
        getGamesByConsole()
      }
  }

  const deleteGame = async (selectedGame) => {
    try {
      setIsLoading(true)
      const response = await GameService.remove(selectedGame.id);
      openSnackbar({message: response.data, type: OPERATION_OUTCOME.SUCCESS})
    }
    catch(e){
      console.log(e)
      openSnackbar({message: e.message, type: OPERATION_OUTCOME.FAILED})
    }
    finally {
      getGamesByConsole()
    }
  }

  return (
    <Games
      addGame={addGame}
      updateGame={updateGame}
      deleteGame={deleteGame}
      getGamesByConsole={getGamesByConsole}
      getWishlistByConsole={getWishlistByConsole}
    />
    )
}

export default GamesContainer
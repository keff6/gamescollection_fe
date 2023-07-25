import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppState } from "../../Config/store/state";
import { ConsoleService, GameService, GenreService } from '../../services';
import Games from "./Games.component";
import { OPERATION_OUTCOME } from "../../utils/constants";

const GamesContainer = () => {
  const { setGamesList, openSnackbar, setConsolesList, setGenresList, setIsLoading, game: {initialLetter} } = useContext(AppState);
  const { consoleId } = useParams()

  const getGamesByConsoleAndLetter = async () => {
    try {
      setIsLoading(true)
      const gamesResponse = await GameService.getByParams({idConsole: consoleId, initialLetter});
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
      getGamesByConsoleAndLetter()
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
        getGamesByConsoleAndLetter()
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
      getGamesByConsoleAndLetter()
    }
  }

  return (
    <Games
      addGame={addGame}
      updateGame={updateGame}
      deleteGame={deleteGame}
      getGamesByConsoleAndLetter={getGamesByConsoleAndLetter}
      getWishlistByConsole={getWishlistByConsole}
    />
    )
}

export default GamesContainer
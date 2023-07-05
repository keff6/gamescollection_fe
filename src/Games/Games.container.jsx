import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppState } from "../Config/store/state";
import { ConsoleService, GameService, GenreService } from '../services';
import Games from "./Games.component";
import { OPERATION_OUTCOME } from "../utils/constants";
import Spinner from "../Common/Spinner/Spinner.component";

const GamesContainer = () => {
  const { game, setGamesList, openSnackbar, setConsolesList, setGenresList } = useContext(AppState);
  const [isLoading, setIsLoading] = useState(false)
  const { consoleId } = useParams()

  useEffect(() => {
    getGamesByConsole()
  }, []);

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

  return isLoading ? <Spinner />
  : game.list && (
    <Games
      addGame={addGame}
      updateGame={updateGame}
      deleteGame={deleteGame}
    />
    )
}

export default GamesContainer
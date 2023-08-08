import { useParams } from "react-router-dom";
import useAppState from "../../hooks/useAppState";
import { useGamesAPI, useConsolesAPI, useGenresAPI } from "../../hooks/api";
import Games from "./Games.component";
import { OPERATION_OUTCOME } from "../../utils/constants";

const GamesContainer = () => {
  const { setGamesList, openSnackbar, setConsolesList, setGenresList, setIsLoading, game: {initialLetter, searchTerm} } = useAppState();
  const { consoleId } = useParams()
  const gamesAPI = useGamesAPI()
  const consolesAPI = useConsolesAPI()
  const genresAPI = useGenresAPI()

  const getGamesByConsoleAndLetter = async () => {
    try {
      setIsLoading(true)
      const gamesResponse = await gamesAPI.getByParams({idConsole: consoleId, initialLetter});
      const consolesResponse = await consolesAPI.getAll();
      const genresResponse = await genresAPI.getAll();
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
      const gamesResponse = await gamesAPI.getWishlistByConsole(consoleId);
      const consolesResponse = await consolesAPI.getAll();
      const genresResponse = await genresAPI.getAll();
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

  const searchGames = async () => {
    try {
      setIsLoading(true)
      const gamesResponse = await gamesAPI.search(searchTerm, consoleId);
      setGamesList(gamesResponse.data || []);
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
      const response = await gamesAPI.add(gameObj);
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
        const response = await gamesAPI.update(gameId, gameObj);
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
      const response = await gamesAPI.remove(selectedGame.id);
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
      searchGames={searchGames}
    />
    )
}

export default GamesContainer
import { useParams } from "react-router-dom";
import useAppState from "../../hooks/useAppState";
import { useGamesAPI, useGenresAPI, useConsolesAPI } from "../../hooks/api";
import Games from "./Games.component";
import { OPERATION_OUTCOME, ERROR_CODES } from "../../utils/constants";

const GamesContainer = () => {
  const {
    setGamesList,
    openSnackbar,
    setGenresList,
    setConsolesListMisc,
    setIsLoading,
    game: {initialLetter, listOption, searchTerm},
    brand,
  } = useAppState();
  const { consoleId } = useParams()
  const gamesAPI = useGamesAPI()
  const genresAPI = useGenresAPI()
  const consolesAPI = useConsolesAPI()

  const getGamesByConsoleAndLetter = async () => {
    try {
      setIsLoading(true)
      const currentBrand = brand?.selected || JSON.parse(sessionStorage.getItem("brandData"))
      const gamesResponse = await gamesAPI.getByParams({idConsole: consoleId, initialLetter});
      const genresResponse = await genresAPI.getAll();
      const consolesResponse = await consolesAPI.getByBrand(currentBrand?.id);
      setGamesList(gamesResponse.data || []);
      setGenresList(genresResponse.data || []);
      setConsolesListMisc(consolesResponse?.data || [])
    }
    catch(e){
      console.log(e)
      openSnackbar({message: e.message, type: OPERATION_OUTCOME.FAILED})
    }
    finally {
      setIsLoading(false)
    }
  }

  const getGamesByConsole = async () => {
    try {
      setIsLoading(true)
      const gamesResponse = await gamesAPI.getByParams({idConsole: consoleId});
      const genresResponse = await genresAPI.getAll();
      setGamesList(gamesResponse.data || []);
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
      const genresResponse = await genresAPI.getAll();
      setGamesList(gamesResponse.data || []);
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
      const errorCode = e?.response?.data || "";
      if(errorCode === ERROR_CODES.DUPLICATED) {
        throw new Error("Game already exists in database")
      }
      openSnackbar({message: e.message, type: OPERATION_OUTCOME.FAILED})
    }
    finally {
      if(listOption === 'all') getGamesByConsole()
      else getGamesByConsoleAndLetter()
    }
  }

  const updateGame = async (gameId, gameObj) => {
    try {
        setIsLoading(true)
        const response = await gamesAPI.update(gameId, gameObj);
        openSnackbar({message: response.data, type: OPERATION_OUTCOME.SUCCESS})
      }
      catch(e){
        const errorCode = e?.response?.data || "";
        if(errorCode === ERROR_CODES.DUPLICATED) {
          throw new Error("Game already exists in database")
        }
        openSnackbar({message: e.message, type: OPERATION_OUTCOME.FAILED})
      }
      finally {
        if(listOption === 'all') getGamesByConsole()
        else getGamesByConsoleAndLetter()
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
      getGamesByConsole={getGamesByConsole}
      getWishlistByConsole={getWishlistByConsole}
      searchGames={searchGames}
    />
    )
}

export default GamesContainer
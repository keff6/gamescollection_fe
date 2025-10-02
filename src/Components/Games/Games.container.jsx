import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useAppState from "../../hooks/useAppState";
import { useGamesAPI, useGenresAPI, useConsolesAPI } from "../../hooks/api";
import Games from "./Games.component";
import { OPERATION_OUTCOME, ERROR_CODES, MAX_ITEMS_PER_PAGE, GAME_LIST_OPTIONS } from "../../utils/constants";

const GamesContainer = () => {
  const {
    setGamesList,
    openSnackbar,
    setGenresList,
    setSelectedConsole,
    setConsolesListMisc,
    setIsLoading,
    game: {initialLetter, listOption, pagination, list },
    brand,
  } = useAppState();
  const { consoleId } = useParams()
  const gamesAPI = useGamesAPI()
  const genresAPI = useGenresAPI()
  const consolesAPI = useConsolesAPI()

  useEffect(() => {
    const fetchMiscData = async () => {
      const currentBrand = brand?.selected || JSON.parse(sessionStorage.getItem("brandData"))
      const genresResponse = await genresAPI.getAll();
      const consolesResponse = await consolesAPI.getByBrand(currentBrand?.id);
      setGenresList(genresResponse.data || []);
      setConsolesListMisc(consolesResponse?.data || [])
    }
    fetchMiscData();
  }, []);

  const getGames = async (isFirstPage = true, params = null) => {
    try {
      setIsLoading(true)
      const gamesResponse = await gamesAPI.getByParams({
        idConsole: consoleId,
        currentPage: isFirstPage ? pagination?.currentPage :  (+pagination?.currentPage + 1).toString() ,
        limit: MAX_ITEMS_PER_PAGE,
        ...(listOption === GAME_LIST_OPTIONS.ALPHABET && {initialLetter: initialLetter}),
        ...(params !== null && {...params}),
      });

      const { data: {data, pagination: updatedPagination} } = gamesResponse;
      const { currentPage } = updatedPagination
      const updatedList = (+currentPage === 1) ? data : [...list, ...data]
      const updatedPayload = { data: updatedList, pagination: updatedPagination} 

      setGamesList(updatedPayload || { data: [], pagination: pagination });
    } catch(e) {
      console.log(e)
      openSnackbar({message: e.message, type: OPERATION_OUTCOME.FAILED})
    } finally {
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
      const currentConsole = await consolesAPI.getById(consoleId);
      setSelectedConsole(currentConsole?.data || {})
      getGames()
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
        getGames()
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
      const currentConsole = await consolesAPI.getById(consoleId);
      setSelectedConsole(currentConsole?.data || {})
      getGames()
    }
  }

  return (
    <Games
      addGame={addGame}
      updateGame={updateGame}
      deleteGame={deleteGame}
      getGames={getGames}
    />
    )
}

export default GamesContainer
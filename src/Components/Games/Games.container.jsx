import { useParams } from "react-router-dom";
import { useEffect, useCallback } from "react";
import { useAppState, useAPI, useApiErrorHandler, useSessionStorage } from "../../hooks";
import { OPERATION_OUTCOME, MAX_ITEMS_PER_PAGE, GAME_LIST_OPTIONS, SESSION_STORAGE, ENTITIES, API_ROUTES, CONSOLE_FILTER_OPTIONS } from "../../utils/constants";
import { buildParamsString } from "../../utils/buildParamsString";
import Games from "./Games.component";

const GamesContainer = () => {
  const {
    setGamesList,
    openSnackbar,
    setGenresList,
    setSelectedConsole,
    setConsolesListMisc,
    game: {initialLetter, listOption, pagination, list },
    brand,
    console: { selected: selectedConsole }
  } = useAppState();
  const { consoleId } = useParams()
  const { get, post, del, put, error } = useAPI(true, ENTITIES.GAME);
  const { get: getConsole, error: consoleError } = useAPI(false, ENTITIES.CONSOLE);
  const { get: getGenres, error: genreError } = useAPI(true, ENTITIES.GENRE);
  const [storedBrand] = useSessionStorage(SESSION_STORAGE.BRAND, null)
  const [,setStoredConsole] = useSessionStorage(SESSION_STORAGE.CONSOLE, null)
  useApiErrorHandler(error || consoleError || genreError)

  const getGames = useCallback(async (isFirstPage = true, params = null) => {
    const paramsString = buildParamsString({
        idConsole: consoleId,
        currentPage: isFirstPage ? "1" :  (+pagination?.currentPage + 1).toString() ,
        limit: MAX_ITEMS_PER_PAGE,
        ...(listOption === GAME_LIST_OPTIONS.ALPHABET && {initialLetter: initialLetter}),
        ...(params !== null && {...params}),
      })
    const games = await get(API_ROUTES.GAMES.GET_BY_PARAMS(paramsString));
    const { data, pagination: updatedPagination} = games;
    const { currentPage } = updatedPagination;
    const updatedList = (+currentPage === 1) ? data : [...list, ...data]
    const updatedPayload = { data: updatedList, pagination: updatedPagination} 

    setGamesList(updatedPayload || { data: [], pagination: pagination });
  }, [list, listOption, initialLetter])

  const fetchMiscData = useCallback(async () => {
    const currentBrand = brand?.selected || storedBrand;
    const genres = await getGenres(API_ROUTES.GENRES.GET_ALL);
    const consoles = await getConsole(API_ROUTES.CONSOLES.GET_BY_BRAND(currentBrand?.id, CONSOLE_FILTER_OPTIONS.ALL));
    setGenresList(genres || []);
    setConsolesListMisc(consoles || [])
    selectedConsole && setStoredConsole(selectedConsole)
  }, [])

  useEffect(() => {
    fetchMiscData();
  }, []);

  const refreshConsoleData = async () => {
    const currentConsole = await getConsole(API_ROUTES.CONSOLES.GET_BY_ID(consoleId));
    setSelectedConsole(currentConsole || {})
  }

  const addGame = async (gameObj) => {
    const responseMessage = await post(API_ROUTES.GAMES.ADD, gameObj)
    openSnackbar({message: responseMessage, type: OPERATION_OUTCOME.SUCCESS})
    getGames();
    refreshConsoleData()
  }

  const updateGame = async (gameId, gameObj) => {
    const responseMessage = await put(API_ROUTES.GAMES.UPDATE(gameId), gameObj);
    openSnackbar({message: responseMessage, type: OPERATION_OUTCOME.SUCCESS})
    getGames()
  }

  const deleteGame = async (selectedGame) => {
    const responseMessage = await del(API_ROUTES.GAMES.DELETE(selectedGame.id));
    openSnackbar({message: responseMessage, type: OPERATION_OUTCOME.SUCCESS})
    getGames()
    refreshConsoleData()
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
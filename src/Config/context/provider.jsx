import { useMemo, useReducer } from "react";
import proptypes from 'prop-types';
import { reducer } from "./reducer";
import { actionTypes as actions } from "./actions";
import { GAME_LIST_OPTIONS, MAX_ITEMS_PER_PAGE, CONSOLE_FILTER_OPTIONS } from "../../utils/constants";
import { AppState } from "./state";

const APP_STATE = {
  genre: {
    list: [],
    selected: null
  },
  brand: {
    list: [],
    selected: null
  },
  console: {
    list: [],
    listFilter: CONSOLE_FILTER_OPTIONS.ALL,
    total: 0,
    selected: null,
  },
  game: {
    list: [],
    total: 0,
    selected: null,
    listOption: GAME_LIST_OPTIONS.ALL,
    initialLetter: '#',
    searchTerm: '',
    pagination: {
      totalItems: 0,
      totalPages: 0,
      currentPage: 1,
      pageSize: MAX_ITEMS_PER_PAGE,
    },
  },
  info: {
    totalGames: 0
  },
  snackbar: {
    message: '',
    type: '',
    show: false,
  },
  misc: {
    brands: [],
    consoles: [],
  },
  sorting: {
    sortKey: '',
    sortDirection: '',
  },
  isLoading: false,
  user: null,
};

export const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, APP_STATE);

  const value = useMemo(
    () => ({
      ...state,
      setSelectedGenre: (selectedGenre) => {
        dispatch({
          type: actions.SET_SELECTED_GENRE,
          payload: {selectedGenre}
        });
      },
      setGenresList: (genresList) => {
        dispatch({
          type: actions.SET_GENRES_LIST,
          payload: genresList
        });
      },
      setSelectedBrand: (selectedBrand) => {
        dispatch({
          type: actions.SET_SELECTED_BRAND,
          payload: {selectedBrand}
        });
      },
      setBrandsList: (brandsList) => {
        dispatch({
          type: actions.SET_BRANDS_LIST,
          payload: brandsList
        });
      },
      setBrandsListMisc: (brandsList) => {
        dispatch({
          type: actions.SET_BRANDS_LIST_MISC,
          payload: brandsList
        });
      },
      setSelectedConsole: (selectedConsole) => {
        dispatch({
          type: actions.SET_SELECTED_CONSOLE,
          payload: {selectedConsole}
        });
      },
      setConsolesList: (consolesList) => {
        dispatch({
          type: actions.SET_CONSOLES_LIST,
          payload: consolesList,
        });
      },
      setConsolesFilter: (filter) => {
        dispatch({
          type: actions.SET_CONSOLES_LIST_FILTER,
          payload: filter,
        })
      },
      setConsolesListMisc: (consolesList) => {
        dispatch({
          type: actions.SET_CONSOLES_LIST_MISC,
          payload: consolesList,
        });
      },
      setSelectedGame: (selectedGame) => {
        dispatch({
          type: actions.SET_SELECTED_GAME,
          payload: {selectedGame}
        });
      },
      setGamesList: (gamesList) => {
        dispatch({
          type: actions.SET_GAMES_LIST,
          payload: gamesList
        });
      },
      openSnackbar: ({message, type}) => {
        dispatch({
          type: actions.OPEN_SNACKBAR,
          payload: { message, type }
        })
      },
      closeSnackbar: () => {
        dispatch({
          type: actions.CLOSE_SNACKBAR,
        })
      },
      setGamesListOption: (option) => {
        dispatch({
          type: actions.SET_GAMES_LIST_OPTION,
          payload: option,
        })
      },
      setInitialLetter: (letter) => {
        dispatch({
          type: actions.SET_INITIAL_LETTER,
          payload: letter,
        })
      },
      setSearchTerm: (searchTerm) => {
        dispatch({
          type: actions.SET_SEARCH_TERM,
          payload: searchTerm,
        })
      },
      setIsLoading: (isLoading) => {
        dispatch({
          type: actions.SET_IS_LOADING,
          payload: isLoading,
        })
      },
      setAuthUser: (userData) => {
        dispatch({
          type: actions.SET_AUTH_USER,
          payload: userData,
        })
      },
      setInfoTotals: (totals) => {
        dispatch({
          type: actions.SET_INFO_TOTALS,
          payload: totals,
        })
      },
      setSortingKey: (key) => {
        dispatch({
          type: actions.SET_SORTING_KEY,
          payload: key,
        })
      },
      setSortingDirection: (direction) => {
        dispatch({
          type: actions.SET_SORTING_DIRECTION,
          payload: direction,
        })
      },
    }),
    [state, dispatch]
  );

  AppStateProvider.propTypes = {
    children: proptypes.node,
  }
  
  return <AppState.Provider value={value}>{children}</AppState.Provider>;
};
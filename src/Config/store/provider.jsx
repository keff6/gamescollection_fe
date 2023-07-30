import { useMemo, useReducer } from "react";
import proptypes from 'prop-types';
import { reducer } from "./reducer";
import { actionTypes as actions } from "./actions";
import { GAME_LIST_OPTIONS } from "../../utils/constants";
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
    selected: null,
  },
  game: {
    list: [],
    selected: null,
    listOption: GAME_LIST_OPTIONS.ALPHABET,
    initialLetter: '#',
    searchTerm: '',
  },
  snackbar: {
    message: '',
    type: '',
    show: false,
  },
  isLoading: false,
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
      setSelectedConsole: (selectedConsole) => {
        dispatch({
          type: actions.SET_SELECTED_CONSOLE,
          payload: {selectedConsole}
        });
      },
      setConsolesList: (consolesList) => {
        dispatch({
          type: actions.SET_CONSOLES_LIST,
          payload: consolesList
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
      }
    }),
    [state, dispatch]
  );

  AppStateProvider.propTypes = {
    children: proptypes.node,
  }
  
  return <AppState.Provider value={value}>{children}</AppState.Provider>;
};
import { useMemo, useReducer } from "react";
import proptypes from 'prop-types';
import { reducer } from "./reducer";
import { actionTypes as actions } from "./actions";
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
  snackbar: {
    message: '',
    type: '',
    show: false,
  }
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
      }
    }),
    [state, dispatch]
  );

  AppStateProvider.propTypes = {
    children: proptypes.node,
  }
  
  return <AppState.Provider value={value}>{children}</AppState.Provider>;
};
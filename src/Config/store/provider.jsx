import { useMemo, useReducer } from "react";
import proptypes from 'prop-types';
import { reducer } from "./reducer";
import { actionTypes as actions } from "./actions";
import { AppState } from "./state";

const APP_STATE = {
  genre: {
    list: [],
    selected: null
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
    }),
    [state, dispatch]
  );

  AppStateProvider.propTypes = {
    children: proptypes.node,
  }
  
  return <AppState.Provider value={value}>{children}</AppState.Provider>;
};
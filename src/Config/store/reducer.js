import { actionTypes as actions } from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_SELECTED_GENRE:
      return {
        ...state,
        genre: {
          ...state.genre,
          selected: action.payload.selectedGenre
        }
      };
    case actions.SET_GENRES_LIST:
      return {
        ...state,
        genre: {
          ...state.genre,
          list: action.payload.genres
        }
      };
    case actions.OPEN_SNACKBAR:
      return {
        ...state,
        snackbar: {
          message: action.payload.message,
          type: action.payload.type,
          show: true
        }
      };
    case actions.CLOSE_SNACKBAR:
      return {
        ...state,
        snackbar: {
          message: '',
          type: '',
          show: false
        }
      };
    default:
      return state;
  }
};

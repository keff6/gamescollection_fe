import { actionTypes as actions } from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_SELECTED_GENRE:
      console.log(action)
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
    default:
      return state;
  }
};

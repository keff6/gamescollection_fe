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
    case actions.SET_SELECTED_BRAND:
      return {
        ...state,
        brand: {
          ...state.brand,
          selected: action.payload.selectedBrand
        }
      };
    case actions.SET_BRANDS_LIST:
      return {
        ...state,
        brand: {
          ...state.brand,
          list: action.payload.brands
        }
      };
    case actions.SET_BRANDS_LIST_MISC:
      return {
        ...state,
        misc: {
          ...state.misc,
          brands: action.payload.brands
        }
      };
    case actions.SET_SELECTED_CONSOLE:
      return {
        ...state,
        console: {
          ...state.console,
          selected: action.payload.selectedConsole
        }
      };
    case actions.SET_CONSOLES_LIST:
      return {
        ...state,
        console: {
          ...state.console,
          list: action.payload.consoles,
          total: action.payload.total,
        }
      };
    case actions.SET_CONSOLES_LIST_FILTER:
      return {
        ...state,
        console: {
          ...state.console,
          listFilter: action.payload,
        }
      };
    case actions.SET_CONSOLES_LIST_MISC:
      return {
        ...state,
        misc: {
          ...state.misc,
          consoles: action.payload.consoles,
        }
      };
    case actions.SET_SELECTED_GAME:
      return {
        ...state,
        game: {
          ...state.game,
          selected: action.payload.selectedGame
        }
      };
    case actions.SET_GAMES_LIST:
      return {
        ...state,
        game: {
          ...state.game,
          list: action.payload.data,
          pagination: action.payload.pagination
        }
      };
    case actions.SET_GAMES_LIST_OPTION:
      return {
        ...state,
        game: {
          ...state.game,
          listOption: action.payload,
          pagination: {
            ...state.game.pagination,
            currentPage: 1,
          }
        }
      };
    case actions.SET_INITIAL_LETTER:
      return {
        ...state,
        game: {
          ...state.game,
          initialLetter: action.payload,
          pagination: {
            ...state.game.pagination,
            currentPage: 1,
          }
        }
      };
    case actions.SET_SEARCH_TERM:
      return {
        ...state,
        game: {
          ...state.game,
          searchTerm: action.payload,
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
    case actions.SET_STATS_TOTALS:
      return {
        ...state,
        stats: {
          ...state.stats,
          ...action.payload
        }
      }
    case actions.SET_AUTH_USER:
      return {
        ...state,
        user: action.payload,
      }
    case actions.SET_SORTING_KEY:
      return {
        ...state,
        sorting: {
          ...state.sorting,
          sortKey: action.payload,
        }
      }
    case actions.SET_SORTING_DIRECTION:
      return {
        ...state,
        sorting: {
          ...state.sorting,
          sortDirection: action.payload,
        }
      }
    default:
      return state;
  }
};

export const OPERATION_OUTCOME = {
  SUCCESS: 'success',
  FAILED: 'danger',
}

export const CONSOLE_GENERATIONS = [
  { value: 1, text: '1st (1972 - 1978)' },
  { value: 2, text: '2nd (1976 - 1984)' },
  { value: 3, text: '3rd (8 bits)' },
  { value: 4, text: '4th (16 bits)' },
  { value: 5, text: '5th (32 / 64 bits)' },
  { value: 6, text: '6th (128 bits)' },
  { value: 7, text: '7th (2004 - 2014)' },
  { value: 8, text: '8th (2011 - present)' },
  { value: 9, text: '9th (2020 - present)' },
];

export const GAME_LIST_OPTIONS = {
    ALPHABET: 'alphabet',
    WISHLIST: 'wishlist',
    SEARCH: 'search',
    ALL: 'all'
  };

export const CONSOLE_FILTER_OPTIONS = {
  ALL: 'all',
  HOME: 'home',
  PORTABLE: 'portable',
}

export const ALPHABET = '#ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const NO_DATA = 'N/A';

export const BADGE_TYPE = {
  NEW: { label: 'New', miniLabel: 'N' },
  COMPLETE: { label: 'Complete', miniLabel: 'C' },
  DIGITAL: { label: 'Digital', miniLabel: 'D' },
  BACKLOG: { label: 'Backlog', miniLabel: 'B' },
  PLAYING: { label: 'Playing', miniLabel: 'P' },
  FINISHED: { label: 'Finished', miniLabel: 'F' },
}

export const ERROR_CODES = {
  DUPLICATED: 'ER_DUP_ENTRY',
  IS_REFERENCED: 'ER_ROW_IS_REFERENCED_2'
}

export const MAX_ITEMS_PER_PAGE = 25;

export const SESSION_STORAGE = {
  USER: 'user',
  BRAND: 'brand',
  CONSOLE: 'console',
}

export const ENTITIES = {
  GENRE: 'Genre',
  BRAND: 'Brand',
  CONSOLE: 'Console',
  GAME: 'Game'
}

export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth',
    LOGOUT: '/logout',
    REFRESH: '/refresh',
  },
  GENRES: {
    GET_ALL: '/genres',
    ADD: '/genres/add',
    UPDATE: (id) => `/genres/edit/${id}`,
    DELETE: (id) => `/genres/remove/${id}`
  },
  BRANDS: {
    GET_ALL: '/brands',
    ADD: '/brands/add',
    UPDATE: (id) => `/brands/edit/${id}`,
    DELETE: (id) => `/brands/remove/${id}`
  },
  CONSOLES: {
    GET_ALL: '/consoles',
    GET_BY_ID: (id) => `/consoles/${id}`,
    GET_BY_BRAND: (id, filter) => `/consoles/brand/${id}${
      (filter === CONSOLE_FILTER_OPTIONS.ALL) ? '' :
      (filter === CONSOLE_FILTER_OPTIONS.HOME) ? '?type=0 ' : '?type=1'
    }`,
    ADD: '/consoles/add',
    UPDATE: (id) => `/consoles/edit/${id}`,
    DELETE: (id) => `/consoles/remove/${id}`,
  },
  GAMES: {
    GET_ALL: '/games',
    GET_WISHLIST_BY_CONSOLE: (id) => `/games/wishlist/${id}`,
    ADD: '/games/add',
    UPDATE: (id) => `/games/edit/${id}`,
    DELETE: (id) => `/games/remove/${id}`,
    SEARCH: '/games/search',
    GET_BY_PARAMS: (paramsString) => `/games/get${paramsString}`
  }

};
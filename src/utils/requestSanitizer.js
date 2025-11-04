export const gameObjectSanitizer = game => {
    game.isNew = (game.statusGroup === 'isNew') ? 1 : 0;
    game.isComplete = (game.statusGroup === 'isComplete')  ? 1 : 0;
    game.isWishlist= (game.statusGroup === 'isWishlist')  ? 1 : 0;
    game.isDigital = (game.statusGroup === 'isDigital')  ? 1 : 0;
    game.saga = JSON.stringify(game.saga);
    delete game.sagaText;
    delete game.selectedGenre;
    delete game.isIncomplete;
    delete game.statusGroup;

    return game;
  }


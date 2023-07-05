export const gameObjectSanitizer = game => {
    game.isNew = game.isNew ? 1 : 0;
    game.isComplete = game.isComplete ? 1 : 0;
    game.isWishlist= game.isWishlist ? 1 : 0;
    game.isDigital = game.isDigital ? 1 : 0;
    game.saga = JSON.stringify(game.saga);
    delete game.sagaText;
    delete game.selectedGenre;

    return game;
  }


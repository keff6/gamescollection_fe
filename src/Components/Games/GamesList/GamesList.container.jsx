/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import proptypes from "prop-types";
import { useAppState } from "../../../hooks";
import GamesList from "./GamesList.component";
import { GAME_LIST_OPTIONS } from "../../../utils/constants";

const GamesListContainer = ({
  editGame,
  deleteGame,
  getGames,
  saveUpdatedChanges,
}) => {
  const { game, setGamesList, setSortingKey, setSortingDirection } = useAppState();

  useEffect(
    () => () => {
      setGamesList({ data: [], pagination: game?.pagination });
    },
    []
  );

  useEffect(() => {
    handleGetGames();
    setSortingKey('title');
    setSortingDirection('asc');
  }, [game.listOption, game.initialLetter]);

  const handleGetGames = (isFirstPage = true, params = null) => {
    const { listOption } = game;

    if(listOption === GAME_LIST_OPTIONS.SEARCH) setGamesList({ data: [], pagination: game?.pagination });
    else {
      if(listOption === GAME_LIST_OPTIONS.WISHLIST) params = {...params, isWishlist: 1}
      getGames(isFirstPage, params);
    }
  };

  return (
    <GamesList
      editGame={editGame}
      deleteGame={deleteGame}
      listOption={game.listOption}
      getGames={handleGetGames}
      updateGame={saveUpdatedChanges}
    />
  );
};

GamesListContainer.propTypes = {
  editGame: proptypes.func,
  deleteGame: proptypes.func,
  getGames: proptypes.func,
  saveUpdatedChanges: proptypes.func,
};

export default GamesListContainer;

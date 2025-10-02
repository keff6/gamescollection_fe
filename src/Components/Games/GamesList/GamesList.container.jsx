/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import proptypes from "prop-types";
import useAppState from "../../../hooks/useAppState";
import GamesList from "./GamesList.component";
import { GAME_LIST_OPTIONS } from "../../../utils/constants";

const GamesListContainer = ({
  editGame,
  deleteGame,
  getGames,
  viewDetails,
}) => {
  const { game, setGamesList } = useAppState();

  useEffect(
    () => () => {
      setGamesList({ data: [], pagination: game?.pagination });
    },
    []
  );

  useEffect(() => {
    handleGetGames();
  }, [game.listOption, game.initialLetter]);

  const handleGetGames = (isFirstPage = true) => {
    const { listOption } = game;

    if(listOption === GAME_LIST_OPTIONS.SEARCH) setGamesList({ data: [], pagination: game?.pagination });
    else {
      let params = null;
      if(listOption === GAME_LIST_OPTIONS.WISHLIST) params = {...params, isWishlist: 1}
      getGames(isFirstPage, params);
    }
  };

  return (
    <GamesList
      editGame={editGame}
      deleteGame={deleteGame}
      listOption={game.listOption}
      viewDetails={viewDetails}
      getGames={handleGetGames}
    />
  );
};

GamesListContainer.propTypes = {
  editGame: proptypes.func,
  deleteGame: proptypes.func,
  getGames: proptypes.func,
  viewDetails: proptypes.func,
};

export default GamesListContainer;

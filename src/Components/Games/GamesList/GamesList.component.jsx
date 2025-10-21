import proptypes from "prop-types";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Spinner } from "../../../Common";
import { GAME_LIST_OPTIONS } from "../../../utils/constants";
import useAppState from "../../../hooks/useAppState";
import GameItem from "./GameItem";
import classes from "../Games.module.css";

const GamesList = ({ deleteGame, editGame, listOption, getGames, updateGame }) => {
  const { isLoading, game, sorting: { sortKey, sortDirection} } = useAppState();

  useEffect(() => {
    const sortParams = sortKey === '' ? null : {
      sortBy: sortKey,
      sortDirection: sortDirection,
    }
    getGames(true, sortParams);
  }, [sortKey, sortDirection])

  const isFirstPage = game?.pagination?.currentPage === 1;
  if (isLoading && isFirstPage) return <Spinner />;

  const { list = [], pagination: {totalPages = 1, currentPage = "1"}} = game;
  const showMoreButton = (totalPages === 1 || currentPage === totalPages.toString()) ? false : true;

  const emptyListMessage =
    listOption === GAME_LIST_OPTIONS.SEARCH
      ? "No results found"
      : "Start adding games!";
  let games = list || [];

  const handleShowMore = (e) => {
    e.preventDefault();
    
    const sortParams = {
      sortBy: sortKey,
      sortDirection: sortDirection,
    }
    getGames(false, sortParams);
  };

  return (
    <>
      {games.length > 0 ? (
        <div>
          <div className="results-text">Showing results {games.length || '--'}/ {game?.pagination?.totalItems || '--'}</div>
          <ul className={classes.gameItemsList}>
            {games.map((game) => (
              <GameItem key={game.id} gameData={game} deleteGame={deleteGame} editGame={editGame} updateGame={updateGame}/>
            ))}
          </ul>
          {showMoreButton && <div className="text-center mt-3 mb-3">
            <Button variant="primary" onClick={(e) =>handleShowMore(e)}>
              Show More
            </Button>
          </div>}
        </div>
      ) : (
        <h3 className="empty-list-text">{emptyListMessage}</h3>
      )}
    </>
  );
};

GamesList.propTypes = {
  deleteGame: proptypes.func,
  editGame: proptypes.func,
  listOption: proptypes.string,
  viewDetails: proptypes.func,
  getGames: proptypes.func,
  updateGame: proptypes.func,
};

export default GamesList;

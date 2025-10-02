import proptypes from "prop-types";
import { Table, Button, Dropdown } from "react-bootstrap";
import { PencilSquare, Trash, ListStars } from "react-bootstrap-icons";
import { MoreButton, Tooltip, Badge, Spinner } from "../../../Common";
import { GAME_LIST_OPTIONS } from "../../../utils/constants";
import useAppState from "../../../hooks/useAppState";
import classes from "../Games.module.css";

const GamesList = ({ deleteGame, editGame, listOption, viewDetails, getGames }) => {
  const { user, isLoading, game } = useAppState();

  if (isLoading) return <Spinner />;

  const { list = [], pagination: {totalPages = 1, currentPage = "1"}} = game;
  const showMoreButton = (totalPages === 1 || currentPage === totalPages.toString()) ? false : true;

  const emptyListMessage =
    listOption === GAME_LIST_OPTIONS.SEARCH
      ? "No results found"
      : "Start adding games!";
  let games = list || [];

  const getBadge = (selected) => {
    if (selected?.isNew == true) return <Badge type="NEW" isMini={true} />;
    else if (selected?.isComplete == true)
      return <Badge type="COMPLETE" isMini={true} />;
    else if (selected?.isDigital == true)
      return <Badge type="DIGITAL" isMini={true} />;
    return null;
  };

  const handleShowMore = (e) => {
    e.preventDefault();
    getGames(false);
  };
  
  return (
    <>
      {games.length > 0 ? (
        <div>
          <Table className={classes.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th className={classes.width50px}></th>
                <th className={classes.width80px}>Year</th>
                <th className={`${classes.width35} d-none d-md-table-cell`}>
                  Notes
                </th>
                <th className={classes.width80px}></th>
              </tr>
            </thead>
            <tbody>
              {games.map((game, index) => (
                <tr
                  key={game.id}
                  className={index % 2 != 0 ? classes.clearRow : ""}
                >
                  <td className={classes.textOverflow}>
                    <b>{game.title}</b>
                  </td>
                  <td>{getBadge(game)}</td>
                  <td>{game.year}</td>
                  <td
                    className={`${classes.textOverflow} d-none d-md-table-cell`}
                  >
                    {game.notes}
                  </td>
                  <td>
                    <div className={classes.tableButtonsContainer}>
                      <Tooltip text="View details">
                        <Button
                          variant="info"
                          size="sm"
                          onClick={() => viewDetails(game)}
                        >
                          <ListStars />
                        </Button>
                      </Tooltip>
                      {user && (
                        <Tooltip text="See more options">
                          <Dropdown>
                            <Dropdown.Toggle as={MoreButton} />
                            <Dropdown.Menu size="sm" title="">
                              <Dropdown.Item onClick={() => editGame(game)}>
                                <PencilSquare />
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => deleteGame(game)}
                                className={classes.dangerLink}
                              >
                                <Trash />
                                Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </Tooltip>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {showMoreButton && <div className="text-center mt-3">
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
};

export default GamesList;

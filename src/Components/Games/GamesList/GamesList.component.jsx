import proptypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import { PencilSquare, Trash, List} from "react-bootstrap-icons";
import { GAME_LIST_OPTIONS } from '../../../utils/constants';
import classes from '../Games.module.css';

const GamesList = ({ games, deleteGame, editGame, listOption, viewDetails }) => {
  const emptyListMessage = (listOption === GAME_LIST_OPTIONS.SEARCH) ? 'No results found' : 'Start adding games!';

  return (
    <>
      {(games?.length > 0) &&
      <Table className={classes.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th className={classes.width10}>Year</th>
            <th className={classes.width35}>Notes</th>
            <th className={classes.width20}></th>
          </tr>
        </thead>
        <tbody>
          {games?.map(game => (
            <tr key={game.id}>
              <td className={classes.textOverflow}>{game.title}</td>
              <td>{game.year}</td>
              <td className={classes.textOverflow}>{game.notes}</td>
              <td>
                <div className={classes.tableButtonsContainer}>
                  <Button
                    variant="outline-light"
                    size="sm"
                    onClick={() => viewDetails(game)}
                  >
                    <List />
                  </Button>
                  <Button
                    variant="outline-light"
                    size="sm"
                    onClick={() => editGame(game)}
                  >
                    <PencilSquare />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => deleteGame(game)}
                  >
                    <Trash />
                  </Button>
                </div>
              </td>
            </tr>
            )
          )}
        </tbody>
      </Table>}
      {(games?.length === 0) &&
        <h3 className="empty-list-text">
          {emptyListMessage}
        </h3>}
    </>
  )
}

GamesList.propTypes = {
  deleteGame: proptypes.func,
  editGame: proptypes.func,
  games: proptypes.array,
  listOption: proptypes.string,
  viewDetails: proptypes.func,
}

export default GamesList;
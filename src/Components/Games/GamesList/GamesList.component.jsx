import proptypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import { PencilSquare, Trash } from "react-bootstrap-icons";
import classes from '../Games.module.css';

const GamesList = ({ games, deleteGame, editGame }) => {
  return (
    <>
      {(games?.length > 0) &&
      <Table className={classes.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th className={classes.width10}>Year</th>
            <th className={classes.width35}>Notes</th>
            <th className={classes.width15}></th>
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
      {(games?.length === 0) && <h3>Start adding games</h3>}
    </>
  )
}

GamesList.propTypes = {
  deleteGame: proptypes.func,
  editGame: proptypes.func,
  games: proptypes.array,
}

export default GamesList;
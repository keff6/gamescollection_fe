import proptypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import { PencilSquare, Trash } from "react-bootstrap-icons";
import classes from '../Games.module.css';

const GamesList = ({ games, deleteGame, editGame }) => {
  return (
    <>
      {(games?.length > 0) &&
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Notes</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {games?.map(game => (
            <tr key={game.id}>
              <td>{game.title}</td>
              <td>{game.year}</td>
              <td>{game.notes}</td>
              <td>
                <div className={classes.tableButtonsContainer}>
                  <Button
                    variant="outline-dark"
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
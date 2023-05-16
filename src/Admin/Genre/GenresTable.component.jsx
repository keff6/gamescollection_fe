import proptypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import { PencilSquare, Trash } from "react-bootstrap-icons";
import classes from './Genres.module.css';

const GenresTable = ({ genres, deleteGenre, editGenre }) => {
  return (
    <>
      {(genres.length > 0) &&
      <Table>
        <thead>
          <tr>
            <th className="w-75">Genre</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {genres.map(genre => (
            <tr key={genre.id}>
              <td>{genre.name}</td>
                <td>
                  <div className={classes.tableButtonsContainer}>
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => editGenre(genre)}
                    >
                      <PencilSquare />
                    </Button>
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => deleteGenre(genre)}
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
      {(genres.length === 0) && <h3>Start adding genres</h3>}
    </>
  )
}

GenresTable.propTypes = {
  deleteGenre: proptypes.func,
  editGenre: proptypes.func,
  genres: proptypes.array,
}

export default GenresTable;
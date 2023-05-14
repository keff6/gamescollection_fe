import proptypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import { PencilSquare, Trash } from "react-bootstrap-icons";
import classes from './Genres.module.css';

const GenresTable = ({ genres, setSelectedGenre, deleteGenre, isLoading }) => {
  return (
    <>
      {(!isLoading && genres.length > 0) &&
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
                      onClick={() => setSelectedGenre(genre)}
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
      {(!isLoading && genres.length === 0) && <h3>Start adding genres</h3>}
    </>
  )
}

GenresTable.propTypes = {
  genres: proptypes.array,
  isLoading: proptypes.bool,
  setSelectedGenre: proptypes.func,
  deleteGenre: proptypes.func,
}

export default GenresTable;
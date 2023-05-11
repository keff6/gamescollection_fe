import proptypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import { PencilSquare, Trash } from "react-bootstrap-icons";
import classes from './Genres.module.css';

const GenresTable = ({ genres }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th className="w-75">Genre</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        { genres.map(genre => (
          <tr key={genre.id}>
            <td>{genre.name}</td>
              <td>
                <div className={classes.tableButtonsContainer}>
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => console.log(genre.id)}
                  >
                    <PencilSquare />
                  </Button>
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => console.log(genre.id)}
                  >
                    <Trash />
                  </Button>
                </div>
              </td>
          </tr>
          )
        )}
      </tbody>
    </Table>
  )
}

GenresTable.propTypes = {
  genres: proptypes.array,
}

export default GenresTable;
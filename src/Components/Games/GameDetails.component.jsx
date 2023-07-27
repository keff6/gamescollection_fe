import { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import proptypes from 'prop-types';
import { AppState } from "../../Config/store/state";
import classes from './Games.module.css';
import { NO_DATA } from "../../utils/constants";


const GameDetails = ({
  onHide,
  show,
  ...rest
}) => {
  const { 
    game: {selected}, setSelectedGame, 
    console: {selected : selectedConsole},
    genre: { list: genresList }
  } = useContext(AppState);
  const currentConsole = selectedConsole ? selectedConsole : JSON.parse(sessionStorage.getItem('consoleData'));
  const consoleLabel = currentConsole ? currentConsole.name : NO_DATA;
  const selectedGenres = genresList.filter(g => selected?.genres.includes(g.id));
  const genresLabel = selectedGenres.length > 0 ? selectedGenres.map(g => g.name).join(', ') : NO_DATA;

  const closeForm = () => {
    setSelectedGame(null)
    onHide()
  }

  return (
    <Modal
      {...rest}
      show={show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton={false}>
        <Modal.Title id="contained-modal-title-vcenter">
          {selected?.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={classes.detailsContainer}>
          <div className={classes.dataRow}>
            <span className={classes.dataLabel}>Console:</span>
            <span className={classes.dataText}>{consoleLabel}</span>
          </div>
          <div className={classes.dataRow}>
            <span className={classes.dataLabel}>Year:</span>
            <span className={classes.dataText}>{selected?.year || NO_DATA}</span>
          </div>
          <div className={classes.dataRow}>
            <span className={classes.dataLabel}>Genre(s):</span>
            <span className={classes.dataText}>{genresLabel}</span>
          </div>
          <div className={classes.dataRow}> 
            <span className={classes.dataLabel}>Developer:</span>
            <span className={classes.dataText}>{selected?.developer || NO_DATA}</span>
          </div>
          <div className={classes.dataRow}> 
            <span className={classes.dataLabel}>Publisher:</span>
            <span className={classes.dataText}>{selected?.publisher || NO_DATA}</span>
          </div>
          <div className={classes.dataRow}> 
            <span className={classes.dataLabel}>Is New:</span>
            <span className={classes.dataText}>{selected?.isNew || NO_DATA}</span>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeForm}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

GameDetails.propTypes = {
  onHide: proptypes.func,
  show: proptypes.bool,
}

export default GameDetails
import { Button, Modal } from 'react-bootstrap';
import proptypes from 'prop-types';
import useAppState from '../../hooks/useAppState';
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
  } = useAppState();
  const currentConsole = selectedConsole ? selectedConsole : JSON.parse(sessionStorage.getItem('consoleData'));
  const consoleLabel = currentConsole ? currentConsole.name : NO_DATA;
  const selectedGenres = genresList.filter(g => selected?.genres?.includes(g.id));
  const genresLabel = selectedGenres.length > 0 ? selectedGenres.map(g => g.name).join(', ') : NO_DATA;

  const closeForm = () => {
    onHide()
    setSelectedGame(null)
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
          <div className={classes.leftLabels}>
            <span className={classes.dataLabel}>Console:</span>
            <span className={classes.dataLabel}>Year:</span>
            <span className={classes.dataLabel}>Genre(s):</span>
            <span className={classes.dataLabel}>Developer:</span>
            <span className={classes.dataLabel}>Publisher:</span>
            <span className={classes.dataLabel}>Is New:</span>
          </div>
          <div className={classes.rightLabels}>
            <span className={classes.dataText}>{consoleLabel}</span>
            <span className={classes.dataText}>{selected?.year || NO_DATA}</span>
            <span className={classes.dataText}>{genresLabel}</span>
            <span className={classes.dataText}>{selected?.developer || NO_DATA}</span>
            <span className={classes.dataText}>{selected?.publisher || NO_DATA}</span>
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
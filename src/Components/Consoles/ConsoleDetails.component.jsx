import { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import proptypes from 'prop-types';
import { AppState } from "../../Config/store/state";
import classes from './Consoles.module.css';
import { CONSOLE_GENERATIONS, NO_DATA } from "../../utils/constants";


const ConsoleDetails = ({
  onHide,
  show,
  ...rest
}) => {
  const { console: {selected}, setSelectedConsole, brand: {selected : selectedBrand}} = useContext(AppState);
  const selectedGeneration = CONSOLE_GENERATIONS.find(c => c.value.toString() === selected?.generation);
  const generationLabel = selectedGeneration ? selectedGeneration.text : NO_DATA;
  const currentBrand = selectedBrand ? selectedBrand : JSON.parse(sessionStorage.getItem('brandData'));
  const brandLabel = currentBrand ? currentBrand.name : NO_DATA;


  const closeForm = () => {
    setSelectedConsole(null)
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
          {selected?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={classes.detailsContainer}>
          <div className={classes.dataRow}>
            <span className={classes.dataLabel}>Brand:</span>
            <span className={classes.dataText}>{brandLabel}</span>
          </div>
          <div className={classes.dataRow}>
            <span className={classes.dataLabel}>Year:</span>
            <span className={classes.dataText}>{selected?.year || NO_DATA}</span>
          </div>
          <div className={classes.dataRow}> 
            <span className={classes.dataLabel}>Generation:</span>
            <span className={classes.dataText}>{generationLabel}</span>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeForm}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

ConsoleDetails.propTypes = {
  onHide: proptypes.func,
  show: proptypes.bool,
}

export default ConsoleDetails
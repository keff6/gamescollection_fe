// import { useContext } from 'react';
import { Card, Button } from "react-bootstrap";
// import { ArrowRight } from "react-bootstrap-icons";
// import { useNavigate } from 'react-router-dom';
import proptypes from 'prop-types';
import { PencilSquare, Trash } from "react-bootstrap-icons";
// import { AppState } from "../Config/store/state";
import classes from './Consoles.module.css';


const ConsoleCard = ({ consoleData, editConsole, deleteConsole }) => {
  // const { setSelectedConsole } = useContext(AppState);
  // const navigate = useNavigate();

  // const navigateToGamesHandler = () => {
  //   setSelectedConsole({...consoleData})
  //   navigate("/games")
  // }

  return (
    <Card className={classes.card}>
      <Card.Body className={classes.cardBody}>
        <Card.Title>
          {consoleData.logoURL ?
          <img className={classes.logoImg} src={consoleData.logoURL} alt={consoleData.name} />
          : <span className={classes.brandText}>{consoleData.name}</span>}
        </Card.Title>
        <div className={classes.tableButtonsContainer}>
          <Button
            variant="outline-dark"
            size="sm"
            onClick={() => editConsole(consoleData)}
          >
            <PencilSquare />
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => deleteConsole(consoleData)}
          >
            <Trash />
          </Button>
        </div>
        <div>
          <button type="button" className="btn btn-link">Details</button>
          <button type="button" className="btn btn-link">Games</button>  
        </div>
      </Card.Body>
    </Card>
  ) 
}

ConsoleCard.propTypes = {
  consoleData: proptypes.object,
  deleteConsole: proptypes.func,
  editConsole: proptypes.func,
}

export default ConsoleCard;
import { useContext } from 'react';
import { Card, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import proptypes from 'prop-types';
import { PencilSquare, Trash } from "react-bootstrap-icons";
import { AppState } from "../../Config/store/state";
import classes from './Consoles.module.css';


const ConsoleCard = ({ consoleData, editConsole, deleteConsole, viewDetails }) => {
  const { setSelectedConsole } = useContext(AppState);
  const navigate = useNavigate();

  const navigateToGamesHandler = () => {
    setSelectedConsole({...consoleData})
    sessionStorage.setItem("consoleData", JSON.stringify(consoleData))
    navigate(`/${consoleData.id}/games`)
  }

  return (
    <Card className={classes.card}>
      <Card.Body className={classes.cardBody}>
        <Card.Title>
          {consoleData.logoUrl ?
          <img className={classes.logoImg} src={consoleData.logoUrl} alt={consoleData.name} />
          : <span className={classes.brandText}>{consoleData.name}</span>}
        </Card.Title>
        <footer className={classes.cardFooter}>
          <div className={classes.tableButtonsContainer}>
            <Button
              variant="outline-light"
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
          <div className={classes.navButtons}>
            <Button
              type="button"
              variant="info"
              onClick={() => viewDetails(consoleData)}
            >
              Details
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={navigateToGamesHandler}
            >
              Games
            </Button>  
          </div>
        </footer>
      </Card.Body>
    </Card>
  ) 
}

ConsoleCard.propTypes = {
  consoleData: proptypes.object,
  deleteConsole: proptypes.func,
  editConsole: proptypes.func,
  viewDetails: proptypes.func,
}

export default ConsoleCard;
import { useContext } from 'react';
import { Card, Button } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import { useNavigate } from 'react-router-dom';
import proptypes from 'prop-types';
import { AppState } from "../Config/store/state";
import classes from './Consoles.module.css';


const ConsoleCard = ({consoleData}) => {
  const { setSelectedConsole } = useContext(AppState);
  const navigate = useNavigate();

  const navigateToGamesHandler = () => {
    setSelectedConsole({...consoleData})
    navigate("/games")
  }

  return (
    <Card className={classes.card}>
      <Card.Body className={classes.cardBody}>
        <Card.Title>
          {consoleData.logoURL ?
          <img className={classes.logoImg} src={consoleData.logoURL} alt={consoleData.name} />
          : <span className={classes.brandText}>{consoleData.name}</span>}
        </Card.Title>
        <Button
          variant="primary"
          onClick={navigateToGamesHandler}
        >
          Go <ArrowRight />
        </Button>
      </Card.Body>
    </Card>
  ) 
}

ConsoleCard.propTypes = {
  consoleData: proptypes.object,
}

export default ConsoleCard;
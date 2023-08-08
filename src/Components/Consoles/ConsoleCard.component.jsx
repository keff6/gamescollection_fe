import { Card, Button, Dropdown } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import proptypes from 'prop-types';
import { PencilSquare, Trash } from "react-bootstrap-icons";
import useAppState from '../../hooks/useAppState';
import { MoreButton, Tooltip } from '../../Common';
import classes from './Consoles.module.css';


const ConsoleCard = ({ consoleData, editConsole, deleteConsole, viewDetails }) => {
  const { setSelectedConsole, user } = useAppState();
  const navigate = useNavigate();

  const navigateToGamesHandler = () => {
    setSelectedConsole({...consoleData})
    sessionStorage.setItem("consoleData", JSON.stringify(consoleData))
    navigate(`/${consoleData.id}/games`)
  }

  return (
    <Card className={classes.card}>
      <Card.Body className="card-body-console">
        <Card.Title>
          <div>
            {consoleData.logoUrl ?
            <img className={classes.logoImg} src={consoleData.logoUrl} alt={consoleData.name} />
            : <span className={classes.brandText}>{consoleData.name}</span>}
            <p className={classes.consoleYearLabel}>{consoleData?.year || ""}</p>
          </div>
        </Card.Title>
        <footer className={classes.cardFooter}>
          {user &&
          <div className={classes.tableButtonsContainer}>
            <Tooltip text="See more options">
              <Dropdown>
                <Dropdown.Toggle as={MoreButton} />
                <Dropdown.Menu size="sm" title="">
                  <Dropdown.Item onClick={() => editConsole(consoleData)}><PencilSquare />Edit</Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => deleteConsole(consoleData)}
                    className={classes.dangerLink}
                  >
                    <Trash />Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Tooltip>
          </div>}
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
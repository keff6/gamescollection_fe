import { Card, Button, Dropdown } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import proptypes from 'prop-types';
import { PencilSquare, Trash } from "react-bootstrap-icons";
import { useAppState } from '../../hooks';
import { MoreButton, Tooltip, MiniLabel } from '../../Common';
import { CONSOLE_GENERATIONS, NO_DATA } from '../../utils/constants';
import HomeConsoleIcon from '../../assets/icons/home-console.png';
import PortableConsoleIcon from '../../assets/icons/portable-console.png';
import classes from './Consoles.module.css';


const ConsoleCard = ({ consoleData, editConsole, deleteConsole }) => {
  const { setSelectedConsole, user } = useAppState();
  const navigate = useNavigate();

  const navigateToGamesHandler = () => {
    setSelectedConsole({...consoleData})
    navigate(`/${consoleData.id}/games`)
  }

  return (
    <Card className={classes.consoleCard}>
      <Card.Body >
        <Card.Title>
          <div>
            {consoleData.logoUrl ?
            <img className={classes.logoImg} src={consoleData.logoUrl} alt={consoleData.name} />
            : <div className={classes.consoleName}>
                <img src={consoleData?.isPortable ? PortableConsoleIcon : HomeConsoleIcon} className={classes.consoleTypeIcon}/>
                <span className={classes.consoleTitle}>{consoleData.name}</span>
              </div>}
            <div className={classes.subLabelsContainer}>
              <MiniLabel labelText="Year"><p className={classes.consoleYearLabel}>{consoleData?.year || NO_DATA}</p></MiniLabel>
              <MiniLabel labelText="Generation"><p>{consoleData?.generation ? CONSOLE_GENERATIONS[consoleData?.generation - 1].text : NO_DATA}</p></MiniLabel>  
            </div>
          </div>
          
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
        </Card.Title>
        <footer className={classes.cardFooter}>
          <div className={classes.navButtons}>
            <Button
              type="button"
              variant="primary"
              onClick={navigateToGamesHandler}
            >
              View {consoleData?.totalGames || ''} Games
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
}

export default ConsoleCard;
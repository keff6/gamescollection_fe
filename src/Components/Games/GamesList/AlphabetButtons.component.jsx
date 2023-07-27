import { useContext } from 'react';
import { Nav } from 'react-bootstrap/';
import { AppState } from "../../../Config/store/state";
import { ALPHABET } from '../../../utils/constants';
import classes from '../Games.module.css';

const AlphabetButtons = () => {
  const { game: { initialLetter }, setInitialLetter } = useContext(AppState);

  const handleSelection = eventKey => {
    setInitialLetter(eventKey)
  }

  return (
    <Nav
      className={classes.alphabetNav}
      variant="tabs"
      activeKey={initialLetter}
      onSelect={handleSelection}
      justify
    >
      {ALPHABET.split("").map(letter => <Nav.Item key={letter} className={classes.customTabItem} >
        <Nav.Link
          eventKey={letter}
          className={letter === initialLetter ? classes.customNavLinkActive : classes.customNavLink}
        >
          {letter}
        </Nav.Link>
      </Nav.Item>)}
    </Nav>
  )
}

export default AlphabetButtons
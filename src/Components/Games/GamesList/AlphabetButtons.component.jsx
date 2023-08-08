import { Nav, Dropdown, DropdownButton } from 'react-bootstrap';
import useAppState from '../../../hooks/useAppState'
import { ALPHABET } from '../../../utils/constants';
import classes from '../Games.module.css';

const AlphabetButtons = () => {
  const { game: { initialLetter }, setInitialLetter } = useAppState();

  const handleSelection = eventKey => {
    setInitialLetter(eventKey)
  }

  return (
    <>
      <div className='d-none d-md-block'>
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
      </div>
      <div className='d-block d-md-none'>
        <div className={classes.lettersDropdownContainer}>
          <label>Games that starts with:</label>
          <DropdownButton
            id="dropdown-letters"
            title={initialLetter}
            size="sm"
            onSelect={handleSelection}
            className={classes.lettersDropdown}
          >
            {ALPHABET.split("").map(letter => <Dropdown.Item
              key={letter}
              eventKey={letter}
            >
              {letter}
            </Dropdown.Item>)}
          </DropdownButton>
        </div>
      </div>
    </>
  )
}

export default AlphabetButtons
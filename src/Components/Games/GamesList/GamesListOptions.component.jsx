import { useContext } from 'react';
import { ButtonGroup, ToggleButton, Container, InputGroup, Form, Button } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { AppState } from "../../../Config/store/state";
import { GAME_LIST_OPTIONS } from '../../../utils/constants';
import AlphabetButtons from './AlphabetButtons.component';
import classes from '../Games.module.css';

const GamesListOptions = () => {
  const { game: { listOption }, setGamesListOption } = useContext(AppState);

  return (
    <div>
      <ButtonGroup className={classes.optionsButtons}>
        <ToggleButton
          className={classes.toggleButton}
          key="alphabetic"
          id="radio-alphabetic"
          type="radio"
          name="radio-alphabetic"
          variant="outline-primary"
          value={GAME_LIST_OPTIONS.ALPHABET}
          checked={listOption === GAME_LIST_OPTIONS.ALPHABET}
          onChange={(e) => setGamesListOption(e.currentTarget.value)}
        >
          A-Z
        </ToggleButton>
        <ToggleButton
          className={classes.toggleButton} 
          key="wishlist"
          id="radio-wishlist"
          type="radio"
          name="radio-wishlist"
          variant="outline-primary"
          value={GAME_LIST_OPTIONS.WISHLIST}
          checked={listOption === GAME_LIST_OPTIONS.WISHLIST}
          onChange={(e) => setGamesListOption(e.currentTarget.value)}
        >
          Wishlist
        </ToggleButton>
        <ToggleButton
          className={classes.toggleButton}
          key="search"
          id="radio-search"
          type="radio"
          name="radio-search"
          variant="outline-primary"
          value={GAME_LIST_OPTIONS.SEARCH}
          checked={listOption === GAME_LIST_OPTIONS.SEARCH}
          onChange={(e) => setGamesListOption(e.currentTarget.value)}
        >
          Search
        </ToggleButton>
      </ButtonGroup>
      <br />
      <Container className={classes.optionsContainer}>
        {listOption === GAME_LIST_OPTIONS.ALPHABET ?
          <AlphabetButtons />
          : listOption === GAME_LIST_OPTIONS.SEARCH ?
          <div>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Game title"
                aria-label="Game title"
                aria-describedby="basic-addon2"
              />
              <Button variant="primary" id="button-addon2">
                <Search />
              </Button>
            </InputGroup>
          </div>
          : null
        }
      </Container>
    </div>
  )
}


export default GamesListOptions;
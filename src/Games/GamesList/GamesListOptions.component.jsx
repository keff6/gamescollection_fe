import { useContext } from 'react';
import { ButtonGroup, ToggleButton, Container } from "react-bootstrap";
import { AppState } from "../../Config/store/state";
import { ALPHABET, GAME_LIST_OPTIONS } from '../../utils/constants';
import classes from '../Games.module.css';

const GamesListOptions = () => {
  const { game: { listOption }, setGamesListOption } = useContext(AppState);

  return (
    <div>
      <ButtonGroup>
        <ToggleButton
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
          <div className={classes.lettersContainer}>
            {ALPHABET.split("").map(token => <span key={token}>{token}</span>)}
          </div>
          : listOption === GAME_LIST_OPTIONS.SEARCH ?
          <div>
            <input type="text" />
            <p>search</p>
          </div>
          : null
        }
      </Container>
    </div>
  )
}


export default GamesListOptions;
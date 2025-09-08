import { useEffect } from 'react';
import { ButtonGroup, ToggleButton, Container } from "react-bootstrap";
import proptypes from 'prop-types';
import useAppState from '../../../hooks/useAppState';
import { GAME_LIST_OPTIONS } from '../../../utils/constants';
import AlphabetButtons from './AlphabetButtons.component';
import SearchGames from './SearchGames.component';
import classes from '../Games.module.css';

const GamesListOptions = ({ searchGames }) => {
  const { game: { listOption }, setGamesListOption, setInitialLetter } = useAppState();

  useEffect(() => () => {
    setGamesListOption(GAME_LIST_OPTIONS.ALPHABET);
    setInitialLetter('#');
  },[])

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
          key="all"
          id="radio-all"
          type="radio"
          name="radio-all"
          variant="outline-primary"
          value={GAME_LIST_OPTIONS.ALL}
          checked={listOption === GAME_LIST_OPTIONS.ALL}
          onChange={(e) => setGamesListOption(e.currentTarget.value)}
        >
          All
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
          <SearchGames searchGames={searchGames}/>
          : null
        }
      </Container>
    </div>
  )
}

GamesListOptions.propTypes = {
  searchGames: proptypes.func,
}

export default GamesListOptions;
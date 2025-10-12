import { useEffect } from 'react';
import { ButtonGroup, ToggleButton, Container, Dropdown } from "react-bootstrap";
import proptypes from 'prop-types';
import { SortAlphaDown, SortAlphaDownAlt, SortNumericDown, SortNumericDownAlt  } from 'react-bootstrap-icons';
import useAppState from '../../../hooks/useAppState';
import { GAME_LIST_OPTIONS } from '../../../utils/constants';
import AlphabetButtons from './AlphabetButtons.component';
import SearchGames from './SearchGames.component';
import classes from '../Games.module.css';
import SortButton from '../../../Common/SortButton/SortButton.component';

const GamesListOptions = ({ getGames }) => {
  const { game: { listOption }, setGamesListOption, setInitialLetter, setSortingKey, setSortingDirection } = useAppState();

  useEffect(() => () => {
    setGamesListOption(GAME_LIST_OPTIONS.ALL);
    setInitialLetter('#');
  },[])

  const handleSorting = (key, direction) => {
      setSortingDirection(direction)
      setSortingKey(key)
  }

  return (
    <div>
      <div className={classes.optionsButtonsContainer}>
        <ButtonGroup className={classes.optionsButtons}>
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
        <div>
          <Dropdown>
            <Dropdown.Toggle as={SortButton}/>
            <Dropdown.Menu size="sm" title="">
              <Dropdown.Item onClick={() => handleSorting('title', 'asc')}>
                Sort by title <SortAlphaDown />
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleSorting('title', 'desc')}
              >
                Sort by title <SortAlphaDownAlt />
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleSorting('year', 'asc')}
              >
                Sort by year <SortNumericDown />
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleSorting('year', 'desc')}
              >
                Sort by year <SortNumericDownAlt />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <Container className={classes.optionsContainer}>
        {listOption === GAME_LIST_OPTIONS.ALPHABET ?
          <AlphabetButtons />
          : listOption === GAME_LIST_OPTIONS.SEARCH ?
          <SearchGames getGames={getGames}/>
          : null
        }
      </Container>
    </div>
  )
}

GamesListOptions.propTypes = {
  getGames: proptypes.func,
}

export default GamesListOptions;
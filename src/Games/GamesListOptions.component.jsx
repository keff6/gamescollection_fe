import { useState } from 'react';
import { ButtonGroup, ToggleButton, Container } from "react-bootstrap";
// import proptypes from 'prop-types';
import classes from './Games.module.css';

const ALPHABET = '#ABCDEFGHIJKLMNOPQRSTUVWXYZ';


const GamesListOptions = () => {
  const [radioValue, setRadioValue] = useState('0');

  return (
    <div>
      <ButtonGroup>
        <ToggleButton
          key="alphabetic"
          id="radio-alphabetic"
          type="radio"
          name="radio-alphabetic"
          value="0"
          checked={radioValue === "0"}
          onChange={(e) => setRadioValue(e.currentTarget.value)}
        >
          A-Z
        </ToggleButton>
        <ToggleButton
          key="wishlist"
          id="radio-wishlist"
          type="radio"
          name="radio-wishlist"
          value="1"
          checked={radioValue === "1"}
          onChange={(e) => setRadioValue(e.currentTarget.value)}
        >
          Wishlist
        </ToggleButton>
        <ToggleButton
          key="search"
          id="radio-search"
          type="radio"
          name="radio-search"
          value="2"
          checked={radioValue === "2"}
          onChange={(e) => setRadioValue(e.currentTarget.value)}
        >
          Search
        </ToggleButton>
      </ButtonGroup>
      <br />
      <Container className={classes.optionsContainer}>
        {radioValue === "0" ?
          <div className={classes.lettersContainer}>
            {ALPHABET.split("").map(token => <span key={token}>{token}</span>)}
          </div>
          :
          <div>
            <input type="text" />
            <p>search</p>
          </div>
        }
      </Container>
    </div>
  )
}


export default GamesListOptions;
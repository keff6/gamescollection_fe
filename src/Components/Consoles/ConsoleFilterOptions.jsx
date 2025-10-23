import { useEffect } from 'react';
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { useAppState } from '../../hooks';
import { CONSOLE_FILTER_OPTIONS } from '../../utils/constants';
import classes from './Consoles.module.css';

const ConsoleFilterOptions = () => {
  const { console: { listFilter }, setConsolesFilter } = useAppState();

  useEffect(() => () => {
    setConsolesFilter(CONSOLE_FILTER_OPTIONS.ALL);
  },[])

  return (
    <div>
      <ButtonGroup className={classes.optionsButtons}>
        <ToggleButton
          className={classes.toggleButton} 
          key="all"
          id="radio-all"
          type="radio"
          name="radio-all"
          variant="outline-primary"
          value={CONSOLE_FILTER_OPTIONS.ALL}
          checked={listFilter === CONSOLE_FILTER_OPTIONS.ALL}
          onChange={(e) => setConsolesFilter(e.currentTarget.value)}
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
          value={CONSOLE_FILTER_OPTIONS.HOME}
          checked={listFilter === CONSOLE_FILTER_OPTIONS.HOME}
          onChange={(e) => setConsolesFilter(e.currentTarget.value)}
        >
          Home
        </ToggleButton>
        <ToggleButton
          className={classes.toggleButton} 
          key="wishlist"
          id="radio-wishlist"
          type="radio"
          name="radio-wishlist"
          variant="outline-primary"
          value={CONSOLE_FILTER_OPTIONS.PORTABLE}
          checked={listFilter === CONSOLE_FILTER_OPTIONS.PORTABLE}
          onChange={(e) => setConsolesFilter(e.currentTarget.value)}
        >
          Portable
        </ToggleButton>
      </ButtonGroup>
    </div>
  )
}

export default ConsoleFilterOptions;
import { forwardRef } from "react";
import { SortAlphaDown, SortAlphaDownAlt, SortNumericDown, SortNumericDownAlt } from "react-bootstrap-icons";
import proptypes from "prop-types";
import useAppState from "../../hooks/useAppState";
import { Dropdown } from "react-bootstrap";
import classes from './SortButton.module.css';

const SortButton = forwardRef(({ children, onClick }, ref) => {
  const {sorting: { sortKey, sortDirection}} = useAppState()
  const test = {
    'title': <span className={classes.buttonLabel}>Sort: Title {sortDirection === 'asc' ? <SortAlphaDown/> : <SortAlphaDownAlt />}</span>,
    'year': <span className={classes.buttonLabel}>Sort: Year {sortDirection === 'asc' ? <SortNumericDown/> : <SortNumericDownAlt />}</span>
  }

  return (
    <Dropdown.Toggle
    variant="outline-primary"
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
      className={classes.dropdownButton}
    >
      {children}
      {test[sortKey]}
    </Dropdown.Toggle>
  )
})


SortButton.displayName = "Sort";

SortButton.propTypes = {
  children: proptypes.node,
  onClick: proptypes.func,
}

export default SortButton
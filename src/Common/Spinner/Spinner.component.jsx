import { Spinner as BSSpinner } from "react-bootstrap";
import classes from './Spinner.module.css';

const Spinner = () => (
  <div className={classes.spinner}>
    <BSSpinner
      animation="border"
      role="status"
      variant="secondary"
      size="md"
    >
        <span className="visually-hidden">Loading...</span>
    </BSSpinner>
  </div>
)

export default Spinner
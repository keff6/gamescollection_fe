import { Spinner } from "react-bootstrap";
import classes from './LoadingBanner.module.css';

const LoadingBanner = () => (
  <div className={classes.loadingBanner}>
    <Spinner animation="border" variant="primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    Database is launching! Please wait...
  </div>
);

export default LoadingBanner;
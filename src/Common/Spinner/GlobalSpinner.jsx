import { Spinner } from "react-bootstrap";
import { useLoading } from "../../Config/context/LoadingContext";

const GlobalSpinner = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="global-spinner-overlay d-flex justify-content-center align-items-center">
      <Spinner animation="border" variant="primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default GlobalSpinner;
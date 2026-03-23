import { Spinner } from "react-bootstrap";
import LoadingBanner from "../LoadingBanner/LoadingBanner.component";
import { useState, useEffect } from "react";
import { LONG_LOADING_THRESHOLD } from "../../utils/constants";
import { useLoading } from "../../Config/context/LoadingContext";

const GlobalSpinner = () => {
  const { isLoading } = useLoading();
  const [isSlow, setIsSlow] = useState(false);

  useEffect(() => {
    let timeout;

    if (isLoading) {
      timeout = setTimeout(() => setIsSlow(true), LONG_LOADING_THRESHOLD);
    } else {
      setIsSlow(false);
    }

    return () => clearTimeout(timeout);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="global-spinner-overlay d-flex justify-content-center align-items-center">
      <Spinner animation="border" variant="primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
          {isSlow && <LoadingBanner />}
      </div>
  );
};

export default GlobalSpinner;
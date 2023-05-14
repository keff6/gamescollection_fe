import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "../../Config/ErrorBoundary";

const ErrorBoundaryLayout = () => (
  <ErrorBoundary>
    <Outlet />
  </ErrorBoundary>
);

export default ErrorBoundaryLayout;
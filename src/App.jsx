import { RouterProvider } from "react-router-dom";
import routes from "./Config/Routes";
import { AppStateProvider } from "./Config/context/provider";
import ScrollToTop from "react-scroll-to-top";
// import { Spinner } from "./Common";
import "bootstrap/dist/css/bootstrap.min.css";
// import '@fontsource/roboto';
import "@fontsource/quicksand";
import "./App.css";
import { LoadingProvider } from "./Config/context/LoadingContext";
import GlobalSpinner from "./Common/Spinner/GlobalSpinner";

function App() {
  return (
    <LoadingProvider>
      <AppStateProvider>
        <GlobalSpinner />
        <RouterProvider router={routes} />
        <ScrollToTop smooth />
      </AppStateProvider>
    </LoadingProvider>
  );
}

export default App;

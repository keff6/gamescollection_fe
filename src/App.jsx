import { RouterProvider } from "react-router-dom";
import routes from './Config/Routes';
import { AppStateProvider } from './Config/context/provider';
import ScrollToTop from "react-scroll-to-top";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fontsource/roboto';
import './App.css'

function App() {

  return (
    <AppStateProvider>
      <RouterProvider router={routes} />
      <ScrollToTop smooth />
    </AppStateProvider>
  )
}

export default App

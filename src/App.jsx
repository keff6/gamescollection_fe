import { RouterProvider } from "react-router-dom";
import routes from './Config/Routes';
import { AppStateProvider } from './Config/context/provider';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {

  return (
    <AppStateProvider>
      <RouterProvider router={routes} />
    </AppStateProvider>
  )
}

export default App

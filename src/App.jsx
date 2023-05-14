import { RouterProvider } from "react-router-dom";
import routes from './Config/Routes';
import Provider from './Config/Provider';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <Provider>
      <RouterProvider router={routes} />
    </Provider>
  )
}

export default App

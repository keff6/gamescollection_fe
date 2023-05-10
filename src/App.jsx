import * as React from 'react'
import { RouterProvider } from "react-router-dom";
import routes from './Config/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <React.StrictMode>
      <RouterProvider router={routes} />
    </React.StrictMode>
  )
}

export default App

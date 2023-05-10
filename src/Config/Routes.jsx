import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Home/Dashboard.component";
import Manufacturers from "../Admin/Manufacturer/Manufacturers.component";
import Genres from "../Admin/Genre/Genres.component";
import Layout from '../HOC/Layout/Layout.component';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/manufacturers",
        element: <Manufacturers />,
      },
      {
        path: "/genres",
        element: <Genres />,
      },
    ]
  }
]);

export default router
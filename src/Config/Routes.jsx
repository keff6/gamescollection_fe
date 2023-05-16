import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Home/Dashboard.component";
import Manufacturers from "../Admin/Manufacturer/Manufacturers.component";
import GenresContainer from "../Admin/Genre/Genres.container";
import Layout from '../HOC/Layout/Layout.component';
import ErrorBoundaryLayout from "../HOC/Layout/ErrorBoundaryLayout";


const router = createBrowserRouter([
  {
    element: <ErrorBoundaryLayout />,
    children: [
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
            element: <GenresContainer />,
          },
        ]
      }
    ]
  }
]);

export default router
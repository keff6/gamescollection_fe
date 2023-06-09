import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Home/Dashboard.component";
import BrandsContainer from "../Admin/Brand/Brands.container";
import GenresContainer from "../Admin/Genre/Genres.container";
import Layout from '../Layout/Layout.component';
import ErrorBoundaryLayout from "../Layout/ErrorBoundaryLayout";
import Brands from "../Brands/Brands.container";


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
            children: [
              {
                path: "/",
                element: <Brands />,
              }
            ]
          },
          {
            path: "/brands",
            element: <BrandsContainer />,
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
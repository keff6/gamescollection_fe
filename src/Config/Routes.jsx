import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Components/Home/Dashboard.component";
import BrandsContainer from "../Admin/Brand/Brands.container";
import GenresContainer from "../Admin/Genre/Genres.container";
import Layout from '../Layout/Layout.component';
import ErrorBoundaryLayout from "../Layout/ErrorBoundaryLayout";
import { PageNotFound } from "../Common/ErrorPage";
import Brands from "../Components/Brands/Brands.container";
import Consoles from "../Components/Consoles/Consoles.container";
import Games from "../Components/Games/Games.container";
import Login from "../Components/Login/Login.component";


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
              },
              {
                path: "/:brandId/consoles",
                element: <Consoles />
              },
              {
                path: "/:consoleId/games",
                element: <Games />
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
          {
            path: "/login",
            element: <Login />
          },
          {
            path: "*",
            element: <PageNotFound />,
          },
    
        ]
      }
    ]
  }
]);

export default router
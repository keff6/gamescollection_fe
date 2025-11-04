import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Components/Home/Dashboard.component";
import BrandsContainer from "../Components/Brands/Brand/Brands.container";
import GenresContainer from "../Components/Genres/Genres.container";
import Layout from '../Layout/Layout.component';
import ErrorBoundaryLayout from "../Layout/ErrorBoundaryLayout";
import { PageNotFound, Unauthorized } from "../Common/ErrorPage";
import Brands from "../Components/Brands/Brands.container";
import Consoles from "../Components/Consoles/Consoles.container";
import Games from "../Components/Games/Games.container";
import Login from "../Components/Login/Login.container";
import RequireAuth from "../Layout/RequireAuth";
import PersistLogin from "../Components/Login/PersistLogin";
import Stats from "../Components/Stats/Stats.container";
import ExportData from "../Components/ExportData/ExportData.container";
import About from "../Components/About/About.component";


const router = createBrowserRouter([
  {
    element: <ErrorBoundaryLayout />,
    children: [
      {
        element: <PersistLogin />,
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
                    element: <Stats />
                  },
                  {
                    path: "/brands",
                    element: <Brands />,
                  },
                  {
                    path: "/:brandId/consoles",
                    element: <Consoles />
                  },
                  {
                    path: "/:consoleId/games",
                    element: <Games />
                  },
                  {
                    path: "/export",
                    element: <ExportData />
                  },
                  {
                    path: "/about",
                    element: <About />
                  }
                ]
              },
              {
                path: "admin",
                element: <RequireAuth />,
                children: [
                  {
                    path: "brands",
                    element: <BrandsContainer />,
                  },
                  {
                    path: "genres",
                    element: <GenresContainer />,
                  },
                ],
              },
              {
                path: "/login",
                element: <Login />
              },
              {
                path: "/unauthorized",
                element: <Unauthorized />
              },
              {
                path: "*",
                element: <PageNotFound />,
              },
        
            ]
          }
        ]
      }
    ]
  }
]);

export default router
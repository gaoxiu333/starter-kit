import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import { App } from "../app";
import ErrorPage from "../components/error-page";
import React, { Suspense } from "react";

const Notfound = React.lazy(() => import("../pages/404.tsx"));

const routes: Array<RouteObject> = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Navigate to="/home" />,
      },
      {
        path: "/home",
        element: <div>home</div>,
      },
      {
        path: "/about",
        element: <div>about</div>,
      },
      {
        path: "*",
        element: (
          <Suspense>
            <Notfound />
          </Suspense>
        ),
      },
    ],
  },
];
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routes,
    errorElement: <div>error</div>,
  },
]);

export { router };

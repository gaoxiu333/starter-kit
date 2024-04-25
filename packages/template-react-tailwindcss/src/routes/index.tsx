import { Navigate, createBrowserRouter } from "react-router-dom";
import { App } from "../app";
import ErrorPage from "../components/error-page";

const router = createBrowserRouter([
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
    ],
  },
]);

export { router };

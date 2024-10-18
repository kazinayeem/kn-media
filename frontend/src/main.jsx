import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Register";
import ResponsiveAppBar from "./components/Header";
import App from "./App";
import Login from "./components/Login";
import Account from "./components/Account";
import PostPage from "./components/PostPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ResponsiveAppBar />,
    children: [
      {
        path: "/Register",
        element: <Register />,
      },
      {
        path: "/Login",

        element: <Login />,
      },
      {
        path: "/",

        element: <App />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path : "/Post",
        element : <PostPage/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

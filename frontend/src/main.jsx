import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root from "./routes/root";


const router = createBrowserRouter([
  {
    
    path: "/",
    element: <Root/>,
  },

  {
    path : "/login",
    element : <h1>Login</h1>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <RouterProvider router={router} />
  </React.StrictMode>
);
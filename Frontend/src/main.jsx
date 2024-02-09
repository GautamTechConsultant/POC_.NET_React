import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Movies from "./pages/Movies.jsx";
import SingleMovie from "./pages/SingleMovie.jsx";
import SingleActor from "./pages/SingleActor.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Movies />,
  },
  {
    path: "/movie/:id",
    element: <SingleMovie />,
  },
  {
    path: "/actor/:id",
    element: <SingleActor />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

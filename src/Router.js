import Login from "./Components/Login";
import Register from "./Components/Register";
import { useRoutes } from "react-router-dom";
import PageHome from "./Components/PageHome";
export default function Router() {
  return useRoutes([
    {
      path: "/",
      children: [
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/home", element: <PageHome /> },
      ],
    },
  ]);
}

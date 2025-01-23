import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import { CreateLeague } from "./components/create-league";
import { LeagueTable } from "./components/league-table";
import { InsertResults } from "./components/insert-results";
import { Login } from "./components/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/create-League",
        element: <CreateLeague />,
      },
      {
        path: "/league-table",
        element: <LeagueTable />,
      },
      {
        path: "/insert-results",
        element: <InsertResults />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "*", element: "page not found" },
]);

export default router;

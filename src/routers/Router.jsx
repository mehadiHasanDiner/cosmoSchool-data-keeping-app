import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AddItem from "../Pages/DashboardPages/AddItem/AddItem";
import AddEmployee from "../Pages/DashboardPages/AddEmployee/AddEmployee";
import Dashboard from "../Layout/Dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: <Home></Home>,
  },
  {
    path: "signup",
    element: <SignUp></SignUp>,
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "additem",
        element: <AddItem></AddItem>,
      },
      {
        path: "addemployee",
        element: <AddEmployee></AddEmployee>,
      },
    ],
  },
]);

export default router;

import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Dashboard from "../Layout/Dashboard/Dashboard";
import AddSections from "../Pages/DashboardPages/AddSection/AddSections/AddSections";
import AddPurchase from "../Pages/DashboardPages/AddPurchase/AddPurchase";

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
        path: "addsection",
        element: <AddSections></AddSections>,
      },
      {
        path: "addpurchase",
        element: <AddPurchase></AddPurchase>,
      },
    ],
  },
]);

export default router;

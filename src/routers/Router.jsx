import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Dashboard from "../Layout/Dashboard/Dashboard";
import AddSections from "../Pages/DashboardPages/AddSection/AddSections/AddSections";
import AddPurchase from "../Pages/DashboardPages/AddPurchase/AddPurchase";
import AddPurchaseDetails from "../Pages/DashboardPages/AddPurchaseDetails/AddPurchaseDetails";
import PurchaseList from "../Pages/DashboardPages/PurchaseList/PurchaseList";
import Store from "../Pages/DashboardPages/Store/Store";
import AddAllExpense from "../Pages/DashboardPages/AddAllExpense/AddAllExpense";
import ExpenseHistory from "../Pages/DashboardPages/ExpenseHistory/ExpenseHistory";
import AddAllExpenseDetails from "../Pages/DashboardPages/AddAllExpenseDetails/AddAllExpenseDetails";

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
      {
        path: "addpurchase/:id",
        element: <AddPurchaseDetails></AddPurchaseDetails>,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_URL_KEY}/addpurchase/${params.id}`),
      },
      {
        path: "purchaselist",
        element: <PurchaseList></PurchaseList>,
      },
      {
        path: "addAllExpense",
        element: <AddAllExpense></AddAllExpense>,
      },
      {
        path: "addAllExpense/:id",
        element: <AddAllExpenseDetails></AddAllExpenseDetails>,
        loader: ({ params }) =>
          fetch(
            `${import.meta.env.VITE_URL_KEY}/employeeExpenseDetails/${
              params.id
            }`
          ),
      },
      {
        path: "addAllExpense/backItem/:id",
        element: <AddAllExpenseDetails></AddAllExpenseDetails>,
        loader: ({ params }) =>
          fetch(
            `${import.meta.env.VITE_URL_KEY}/employeeExpenseDetails/${
              params.id
            }`
          ),
      },
      {
        path: "expenseHistory",
        element: <ExpenseHistory></ExpenseHistory>,
      },
      {
        path: "store",
        element: <Store></Store>,
      },
    ],
  },
]);

export default router;

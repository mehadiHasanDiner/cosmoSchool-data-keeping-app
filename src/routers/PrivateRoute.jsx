import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="w-full flex justify-center">
        <progress className="progress w-1/4 bg-pink-600 mt-24 text-center h-3"></progress>
      </div>
    );
  }

  if (!user) {
    // If user is not logged in, redirect to the login page
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }

  // If user is logged in and tries to access the login page, redirect to another page (e.g., home page)
  if ((user && location.pathname === "/login") || location.pathname === "/") {
    return <Navigate to="/dashboard" replace />;
  }

  // Otherwise, render the protected content
  return children;
};

export default PrivateRoute;

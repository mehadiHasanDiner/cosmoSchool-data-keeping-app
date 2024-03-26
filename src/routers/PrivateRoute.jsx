import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="w-full flex justify-center">
        <progress className="progress w-1/4 bg-gray-400 mt-24 text-center h-3"></progress>
      </div>
    );
  }

  if (!user) {
    // If user is not logged in, redirect to the login page
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If user is logged in and tries to access the login page, redirect to another page (e.g., home page)
  if (user && location.pathname === "/") {
    return <Navigate to="/dashboard" replace />;
  }
  if (user && location.pathname === "/signup") {
    return <Navigate to="/dashboard" replace />;
  }

  // Otherwise, render the protected content
  return children;
};

export default PrivateRoute;

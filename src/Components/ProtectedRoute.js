import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const auth = localStorage.getItem('isAuthenticated');
  console.log(Boolean(auth.isAuthenticated))
  if (Boolean(auth.isAuthenticated)) {
    return <Navigate to="/home" />;
  }

  return children;
};

export default ProtectedRoute;

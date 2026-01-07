import {  useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: Props) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // ✅ Check if user exists in localStorage
    const user = localStorage.getItem("user");
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
    setLoading(false);
  }, []);

  if (loading) return <p>Checking authentication...</p>;

  return authenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

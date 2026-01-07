import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import "../styles/Login.css";
const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await logout(); // Laravel Sanctum logout
      } catch (error) {
        console.error("Logout failed", error);
      } finally {
        // Clear any local storage if used
        localStorage.clear();

        // Redirect to login
        navigate("/login", { replace: true });
      }
    };

    doLogout();
  }, [navigate]);

  return (
    <div className="bode">
      <div className="login-card">
      <h3>Logging out...</h3>
    </div>
    </div>
  );
};

export default Logout;

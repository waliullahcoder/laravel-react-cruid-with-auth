import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1️⃣ Get CSRF cookie and login
      const res = await login({ email, password });

      // 2️⃣ Save user directly from login response
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // 3️⃣ Show success modal
      setModalMessage("Login successful!");
      setShowModal(true);

      // 4️⃣ Navigate after short delay
      setTimeout(() => {
        setShowModal(false);
        navigate("/products");
      }, 1000);
    } catch (err: any) {
      setModalMessage(
        err.response?.data?.message || "Invalid email or password"
      );
      setShowModal(true);
    }
  };

  return (
    <div className="bode">
      <div className="login-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <p>{modalMessage}</p>
            <button onClick={() => setShowModal(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;

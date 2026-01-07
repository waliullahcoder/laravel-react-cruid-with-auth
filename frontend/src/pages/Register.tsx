import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";
const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(form);
      setModalMessage("Registration successful. Login now!");
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate("/products");
      }, 1500);
      navigate("/login");
    } catch (err) {
      setModalMessage("Registration failed. Please try again.");
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate("/register");
      }, 1500);
    }
  };

  return (
   <div className="bode">
     <div className="login-container">
      <div className="login-card">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <br />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have account? <Link to="/login">Login</Link>
      </p>
      </div>
       {/* Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <p>{modalMessage}</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Register;

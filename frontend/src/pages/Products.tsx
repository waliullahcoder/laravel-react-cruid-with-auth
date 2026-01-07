import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

const Products = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(form);
      alert("Registration successful. Login now!");
      navigate("/login");
    } catch (err) {
      alert("Registration failed.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <br />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Products;
